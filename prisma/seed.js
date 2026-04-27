const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const photo = await prisma.photo.upsert({
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

    await prisma.character.deleteMany({
        where: { photoId: photo.id }
    });

    await prisma.character.createMany({
        data: [
            {
                photoId: photo.id,
                name: "Waldo",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photo: photo.id,
                name: "Wizard",
                xNorm: 0, //put a fucking number here
                yNorm: 0, //put another fucking number here
                radiusNorm: 0.03
            },
            {
                photoId: photo.id,
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