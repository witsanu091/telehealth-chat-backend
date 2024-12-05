import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";

const prisma = new PrismaClient();

/**
 * Ensures the database schema matches the Prisma schema
 */
export async function migrateDatabase() {
    try {
        console.log("Checking and migrating database schema...");
        execSync("npx prisma db push", { stdio: "inherit" });
        console.log("Database migration completed successfully.");
    } catch (error) {
        console.error("Error during database migration:", error);
        throw error;
    }
}

export default prisma;
