const crypto = require("crypto")
const prisma = require("../prisma");

function isWithinRadius(clickX, clickY, targetX, targetY, radius) {
    const dx = clickX-targetX;
    const dy = clickY-targetY;
    return Math.sqrt(dx*dx+dy*dy) <= radius;
}

async function listPhotos(req, res) {
    try {
        const photos = await prisma.photo.findMany({
            orderBy: { createdAt: "asc" },
            select: {
                id: true,
                slug: true,
                title: true,
                imageUrl: true,
                width: true,
                height: true,
                characters: {
                    select: {
                        id: true,
                        name: true
                    },
                    orderBy: { name: "asc" }
                }
            }
        });
        res.json({ photos });
    } catch (err) {
        res.status(500).json({ error: "Failed to load photos" });
    }
}

async function getPhoto(req, res) {
    try {
        const { photoId } = req.params;

        const photo = await prisma.photo.findUnique({
            where: { id: photoId },
            select: {
                id: true,
                slug: true,
                title: true,
                imageUrl: true,
                width: true,
                height: true,
                characters: {
                    select: {
                        id: true,
                        name: true
                    },
                    orderBy: { name: "asc" }
                }
            }
        });

        if (!photo) {
            return res.status(404).json({ error: "Photo not found" });
        }
        res.json({ photo });
    } catch (err) {
        res.status(500).json({ error: "Failed to load photo" });
    }
}

async function startSession(req, res) {
    try {
        const {photoId} = req.body;

        if (!photoId) {
            return res.status(400).json({error: "photoId is required" });
        }

        const photo = await prisma.photo.findUnique({
            where: { id: photoId },
            select: { id: true }
        });

        if (!photo) {
            return res.status(404).json({ error: "Photo not found" });
        }

        const session = await prisma.gameSession.create({
            data: {
                photoId,
                sessionToken: crypto.randomUUID()
            }
        });

        res.json({
            sessionToken: session.sessionToken,
            startedAt: session.startedAt
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to start session" });
    }
}

async function getSession(req, res) {
    try {
        const { token } = req.params;
        
        const session = await prisma.gameSession.findUnique({
            where: { sessionToken: token },
            include: {
                photo: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        imageUrl: true,
                        characters: {
                            select: {
                                id: true,
                                name: true
                            },
                            orderBy: { name: "asc" }
                        }
                    }
                },
                foundChars: {
                    include: {
                        character: {
                            select: {
                                id: true,
                                name: true,
                                xNorm: true,
                                yNorm: true
                            }
                        }
                    }
                }
            }
        });
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        res.json({
            session: {
                sessionToken: session.sessionToken,
                startedAt: session.startedAt,
                completedAt: session.completedAt,
                scoreMs: session.scoreMs,
                playerName: session.playerName,
                photoId: session.photoId,
                foundCharacters: session.foundChars.map((row) => row.character)
            },
            photo: session.photo
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to load session" });
    }
}

async function validateGuess(req, res) {
    try {
        const { sessionToken, photoId, characterId, xNorm, yNorm } = req.body;
        if (!sessionToken || !photoId || !characterId || typeof xNorm !== "number" ||  typeof yNorm !== "number") {
            return res.status(400).json({ error: "Missing or invalid fields" });
        }
        const result = await prisma.$transaction(async (tx) => {
            const session = await tx.gameSession.findUnique({
                where: { sessionToken }
            });
            if (!session) {
                return { status: 404, body: { error: "Session" }};
            }
            if (session.photoId !== photoId) {
                return { status: 400, body: { error: "Session photo mismatch" }};
            }
            if (session.completedAt) {
                return {
                    status: 409,
                    body: { error: "This round is already complete" }
                };
            }
            const character = await tx.character.findFirst({
                where: {
                    id: characterId,
                    photoId
                }
            });

            if (!character) {
                return {
                    status: 404,
                    body: { error: "Character not found" }
                };
            }

            const correct = isWithinRadius(
                xNorm, 
                yNorm,
                character.xNorm,
                character.yNorm,
                character.radiusNorm
            );

            if (!correct) {
                return {
                    status: 200,
                    body: {
                        correct: false,
                        message: "Not quite"
                    }
                };
            } // remove if annoying

            const existing = await tx.sessionCharacter.findUnique({
                where: {
                    sessionId_characterId: {
                        sessionId: session.id,
                        characterId: character.id
                    }
                }
            });

            if (!existing) {
                await tx.sessionCharacter.create({
                    data: {
                        sessionId: session.id,
                        characterId: character.id
                    }
                });
            }


            const totalCharacters = await tx.character.count({
                where: { photoId }
            });

            const foundCharacters = await texx.sessionCharacter.count({
                where: { sessionId: session.id }
            });

            let completed = false;
            let scoreMs = session.scoreMs;

            if (foundCharacters >= totalCharacters && !session.completedAt) {
                const completedAt = new Date();
                scoreMs = completedAt.getTime()-session.startedAt.getTime();
                
                await tx.gameSession.update({
                    where: { id: session.id },
                    data: {
                        completedAt,
                        scoreMs
                    }
                });
                completed = true;
            }

            return {
                status: 200,
                body: {
                    correct: true,
                    alreadyFound: Boolean(existing),
                    completed,
                    scoreMs: scoreMs ?? null,
                    character: {
                        id: character.id,
                        name: character.name,
                        xNorm: character.xNorm,
                        yNorm: character.yNorm
                    }
                }
            };
        });
        return res.status(result.status).json(result.body);
    } catch (err) {
        res.status(500).json({ error: "Failed to validate guess" });
    }
}

async function finishSession(req, res) {
    try {
        const { sessionToken, playerName } = req.body;

        if (!sessionToken || !playerName) {
            return res.status(400).json({ error: "sessionToken and playerName are required" });
        }

        const session = await prisma.gameSession.findUnique({
            where: { sessionToken }
        });

        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        if (!session.completedAt) {
            return res.status(400).json({ error: "Round is not finshed yet" });
        }

        const updated = await prisma.gameSession.update({
            where: { sessionToken },
            data: { playerName: playerName.trim() },
            select: {
                sessionToken: true,
                playerName: true,
                scoreMs: true,
                completedAt: true
            }
        });

        res.json({ session: updated });
    } catch (err) {
        res.status(500).json({ error: "Failed to save score" });
    }
}

async function highScores(req, res) {
    try {
        const { photoId } = req.query;
        const where = {
            completedAt: { not: null },
            playerName: { not: null }
        };

        if (photoId) {
            where.photoId = photoId;
        }

        const score = await prisma.gameSession.findMany({
            where,
            orderBy: [
                { scoreMs: "asc" },
                { completedAt: "asc" }
            ],
            take: 10,
            select: {
                playerName: true,
                scoreMs: true,
                completedAt: true
            }
        });

        res.json({ scores });
    } catch (err) {
        res.status(500).json({ error: "Failed to load high scores" });
    }
}

module.exports = {
    listPhotos,
    getPhoto,
    startSession,
    getSession,
    validateGuess,
    finishSession,
    highScores
};