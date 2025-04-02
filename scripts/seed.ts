const{ PrismaClient} = require("@prisma/client");

const database = new PrismaClient();

async function main(){
    try {
        await database.category.createMany({
            data: [
                {name: "Programming"},
                {name: "Music"},
                {name: "Fitness"},
                {name: "Photography"},
                {name: "Accounting"},
                {name: "Engineering"},
                {name: "Filming"},
                {name: "Science"},
                
            ]
        })
        console.log("Success");
        
    } catch (error) {
      console.log("Error seeding the database categories", error);
        
    } finally{
        await database.$disconnect();
    }
}

main()


// const { PrismaClient } = require("@prisma/client");

// const database = new PrismaClient();

// async function main() {
//     try {
//         await database.category.createMany({
//             data: [
//                 { name: "React State Management" },
//                 { name: "Full-Stack Development" },
//                 { name: "Frontend Development" },
//                 { name: "Backend & APIs" },
//                 { name: "SaaS & E-commerce Development" },
//                 { name: "AI & Automation" },
//                 { name: "UI/UX & Design Systems" },
//                 { name: "Performance Optimization" },
//             ]
//         });
//         console.log("Success");
//     } catch (error) {
//         console.log("Error seeding the database categories", error);
//     } finally {
//         await database.$disconnect();
//     }
// }

// main();
