require("dotenv").config();
const prisma = require("../src/prisma");

async function main() {
    const scene1 = await prisma.photo.upsert({
        where: { slug: "scene-1" },
        update: {
            title: "Scene 1",
            imageUrl: "/images/scene-1.jpg"
        },
        create: {
            slug: "scene-1",
            title: "Scene 1",
            imageUrl: "/images/scene-1.jpg",
            width: 2000,
            height: 1200
        }
    });

    const scene2 = await prisma.photo.upsert({
        where: { slug: "scene-2" },
        update: {
            title: "Scene 2",
            imageUrl: "/images/scene-2.jpg"
        },
        create: {
            slug: "scene-2",
            title: "Scene 2",
            imageUrl: "/images/scene-2.jpg",
            width: 2000,
            height: 1200
        }
    });

    const scene3 = await prisma.photo.upsert({
        where: { slug: "scene-3" },
        update: {
            title: "Scene 3",
            imageUrl: "/images/scene-3.jpg"
        },
        create: {
            slug: "scene-3",
            title: "Scene 3",
            imageUrl: "/images/scene-3.jpg",
            width: 2000,
            height: 1200
        }
    });

    await prisma.character.deleteMany();

    await prisma.character.createMany({
        data: [
            {
                photoId: scene1.id,
                name: "Waldo",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: scene1.id,
                name: "Wizard",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: scene1.id,
                name: "Wilma",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: scene2.id,
                name: "Waldo",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: scene2.id,
                name: "Wizard",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: scene2.id,
                name: "Wilma",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: scene3.id,
                name: "Waldo",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: scene3.id,
                name: "Wizard",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: scene3.id,
                name: "Wilma",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            }
        ]
    });
    console.log("Seeded photo and characters");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});