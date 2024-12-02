"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: parseInt(process.env.PORT || "") || 8080,
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/chat',
};
