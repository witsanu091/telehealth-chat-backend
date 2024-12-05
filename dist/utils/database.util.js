"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateDatabase = migrateDatabase;
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
const prisma = new client_1.PrismaClient();
/**
 * Ensures the database schema matches the Prisma schema
 */
function migrateDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Checking and migrating database schema...");
            (0, child_process_1.execSync)("npx prisma db push", { stdio: "inherit" });
            console.log("Database migration completed successfully.");
        }
        catch (error) {
            console.error("Error during database migration:", error);
            throw error;
        }
    });
}
exports.default = prisma;
