import { PrismaClient } from "@prisma/client";

try {
    console.log("Instantiating Prisma Client...");
    const prisma = new PrismaClient();
    console.log("Success!");
} catch (e: any) {
    console.error("Failed with empty args:", e.message);
}

try {
    console.log("Instantiating Prisma Client with {}...");
    const prisma2 = new PrismaClient({});
    console.log("Success!");
} catch (e: any) {
    console.error("Failed with {}:", e.message);
}

try {
    console.log("Instantiating Prisma Client with errorFormat...");
    const prisma3 = new PrismaClient({ errorFormat: "pretty" });
    console.log("Success!");
} catch (e: any) {
    console.error("Failed with errorFormat:", e.message);
}
