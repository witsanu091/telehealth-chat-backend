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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
const index_1 = require("./sockets/index");
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || '', 10) || 3000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fastify } = (0, server_1.default)();
        // Connect to the database
        console.log('🔄 Connecting to the database...');
        // await migrateDatabase();
        console.log('✅ Database connection established.');
        fastify.ready().then(() => {
            console.log('🔄 Setting up WebSocket...');
            (0, index_1.setupSocketIO)(fastify.io);
            console.log('✅ WebSocket setup complete.');
        });
        yield fastify.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log(`📚 API documentation at http://localhost:${PORT}/api-docs`);
    }
    catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
}))();
