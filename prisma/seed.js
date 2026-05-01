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
            width: 2400,
            height: 1600
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
            width: 2400,
            height: 1600
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
            width: 2400,
            height: 1600
        }
    });

    const scene4 = await prisma.photo.upsert({
        where: { slug: "scene-4" },
        update: {
            title: "Scene 4",
            imageUrl: "/images/scene-4.jpg"
        },
        create: {
            slug: "scene-4",
            title: "Scene 4",
            imageUrl: "/images/scene-4.jpg",
            width: 2400,
            height: 1600
        }
    });

    const scene5 = await prisma.photo.upsert({
        where: { slug: "scene-5" },
        update: {
            title: "Scene 5",
            imageUrl: "/images/scene-5.jpg"
        },
        create: {
            slug: "scene-5",
            title: "Scene 5",
            imageUrl: "/images/scene-5.jpg",
            width: 2400,
            height: 1600
        }
    });

    const scene6 = await prisma.photo.upsert({
        where: { slug: "scene-6" },
        update: {
            title: "Scene 6",
            imageUrl: "/images/scene-6.jpg"
        },
        create: {
            slug: "scene-6",
            title: "Scene 6",
            imageUrl: "/images/scene-6.jpg",
            width: 2400,
            height: 1600
        }
    });

    const scene7 = await prisma.photo.upsert({
        where: { slug: "scene-7" },
        update: {
            title: "Scene 7",
            imageUrl: "/images/scene-7.jpg"
        },
        create: {
            slug: "scene-7",
            title: "Scene 7",
            imageUrl: "/images/scene-7.jpg",
            width: 2400,
            height: 1600
        }
    });

    const scene8 = await prisma.photo.upsert({
        where: { slug: "scene-8" },
        update: {
            title: "Scene 8",
            imageUrl: "/images/scene-8.jpg"
        },
        create: {
            slug: "scene-8",
            title: "Scene 8",
            imageUrl: "/images/scene-8.jpg",
            width: 2400,
            height: 1600
        }
    });

    await prisma.character.deleteMany();

    await prisma.character.createMany({
        data: [
            {
                photoId: scene1.id,
                name: "Waldo",
                xNorm: 0.283,
                yNorm: 0.356, 
                radiusNorm: 0.03
            },
            {
                photoId: scene1.id,
                name: "Wizard",
                xNorm: 0.964, 
                yNorm: 0.829, 
                radiusNorm: 0.03
            },
            {
                photoId: scene1.id,
                name: "Wilma",
                xNorm: 0.892, 
                yNorm: 0.683, 
                radiusNorm: 0.03
            },
            {
                photoId: scene1.id,
                name: "Woof",
                xNorm: 0.764,
                yNorm: 0.759,
                radiusNorm: 0.03
            },
            {
                photoId: scene1.id,
                name: "Odlaw",
                xNorm: 0.099,
                yNorm: 0.663, 
                radiusNorm: 0.03
            },
            {
                photoId: scene2.id,
                name: "Waldo",
                xNorm: 0.617,
                yNorm: 0.358,
                radiusNorm: 0.03
            },
            {
                photoId: scene2.id,
                name: "Wizard",
                xNorm: 0.270,
                yNorm: 0.337,
                radiusNorm: 0.03
            },
            {
                photoId: scene2.id,
                name: "Wenda",
                xNorm: 0.773, 
                yNorm: 0.393,
                radiusNorm: 0.03
            },
            {
                photoId: scene2.id,
                name: "Woof",
                xNorm: 0.680, 
                yNorm: 0.356,
                radiusNorm: 0.03
            },
            {
                photoId: scene2.id,
                name: "Odlaw",
                xNorm: 0.106, 
                yNorm: 0.341,
                radiusNorm: 0.03
            },
            {
                photoId: scene3.id,
                name: "Waldo",
                xNorm: 0.856,
                yNorm: 0.736,
                radiusNorm: 0.03
            },
            {
                photoId: scene3.id,
                name: "Wizard",
                xNorm: 0.071,
                yNorm: 0.759,
                radiusNorm: 0.03
            },
            {
                photoId: scene3.id,
                name: "Wenda",
                xNorm: 0.489,
                yNorm: 0.416,
                radiusNorm: 0.03
            },
            {
                photoId: scene3.id,
                name: "Odlaw",
                xNorm: 0.318,
                yNorm: 0.638,
                radiusNorm: 0.03
            },
            {
                photoId: scene3.id,
                name: "Woof",
                xNorm: 0.298,
                yNorm: 0.719,
                radiusNorm: 0.03
            },
            {
                photoId: scene4.id,
                name: "Waldo",
                xNorm: 0.275,
                yNorm: 0.320,
                radiusNorm: 0.03
            },
            {
                photoId: scene4.id,
                name: "Wizard",
                xNorm: 0.616,
                yNorm: 0.862,
                radiusNorm: 0.03
            },
            {
                photoId: scene4.id,
                name: "Wenda",
                xNorm: 0.243,
                yNorm: 0.718,
                radiusNorm: 0.03
            },
            {
                photoId: scene4.id,
                name: "Odlaw",
                xNorm: 0.603,
                yNorm: 0.632,
                radiusNorm: 0.03
            },
            {
                photoId: scene4.id,
                name: "Woof",
                xNorm: 0.613,
                yNorm: 0.422,
                radiusNorm: 0.03
            },
            {
                photoId: scene5.id,
                name: "Waldo",
                xNorm: 0.874,
                yNorm: 0.762,
                radiusNorm: 0.03
            },
            {
                photoId: scene5.id,
                name: "Wizard",
                xNorm: 0.603,
                yNorm: 0.700,
                radiusNorm: 0.03
            },
            {
                photoId: scene5.id,
                name: "Wenda",
                xNorm: 0.534,
                yNorm: 0.695,
                radiusNorm: 0.03
            },
            {
                photoId: scene5.id,
                name: "Odlaw",
                xNorm: 0.364,
                yNorm: 0.727,
                radiusNorm: 0.03
            },
            {
                photoId: scene5.id,
                name: "Woof",
                xNorm: 0.648,
                yNorm: 0.921,
                radiusNorm: 0.03
            },
            {
                photoId: scene6.id,
                name: "Waldo",
                xNorm: 0.401,
                yNorm: 0.633,
                radiusNorm: 0.03
            },
            {
                photoId: scene6.id,
                name: "Wizard",
                xNorm: 0.793,
                yNorm: 0.584,
                radiusNorm: 0.03
            },
            {
                photoId: scene6.id,
                name: "Wenda",
                xNorm: 0.287,
                yNorm: 0.519,
                radiusNorm: 0.03
            },
            {
                photoId: scene6.id,
                name: "Odlaw",
                xNorm: 0.054,
                yNorm: 0.705,
                radiusNorm: 0.03
            },
            {
                photoId: scene6.id,
                name: "Woof",
                xNorm: 0.593,
                yNorm: 0.940,
                radiusNorm: 0.03
            },
            {
                photoId: scene7.id,
                name: "Waldo",
                xNorm: 0.171,
                yNorm: 0.708,
                radiusNorm: 0.03
            },
            {
                photoId: scene7.id,
                name: "Wizard",
                xNorm: 0.798,
                yNorm: 0.107,
                radiusNorm: 0.03
            },
            {
                photoId: scene7.id,
                name: "Wenda",
                xNorm: 0.324,
                yNorm: 0.821,
                radiusNorm: 0.03
            },
            {
                photoId: scene7.id,
                name: "Odlaw",
                xNorm: 0.961,
                yNorm: 0.366,
                radiusNorm: 0.03
            },
            {
                photoId: scene7.id,
                name: "Woof",
                xNorm: 0.816,
                yNorm: 0.900,
                radiusNorm: 0.03
            },
            {
                photoId: scene8.id,
                name: "Waldo",
                xNorm: 0.896,
                yNorm: 0.671,
                radiusNorm: 0.03
            },
            {
                photoId: scene8.id,
                name: "Wizard",
                xNorm: 0.542,
                yNorm: 0.547,
                radiusNorm: 0.03
            },
            {
                photoId: scene8.id,
                name: "Wenda",
                xNorm: 0.766,
                yNorm: 0.647,
                radiusNorm: 0.03
            },
            {
                photoId: scene8.id,
                name: "Odlaw",
                xNorm: 0.143,
                yNorm: 0.632,
                radiusNorm: 0.03
            },
            {
                photoId: scene8.id,
                name: "Woof",
                xNorm: 0.464,
                yNorm: 0.472,
                radiusNorm: 0.03
            },
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