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
const fastify_1 = __importDefault(require("fastify"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const config_1 = require("./config");
const token_routes_1 = __importDefault(require("./routes/token.routes"));
const sockets_1 = require("./sockets");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, fastify_1.default)({ logger: true });
const httpServer = (0, http_1.createServer)(app.server);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
// Default Route
app.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { message: 'Welcome to the Telehealth Chat API' };
}));
// Initialize Socket.IO
(0, sockets_1.initializeSocket)(io);
// Register Routes
app.register(token_routes_1.default, { prefix: '/api' });
// MongoDB Connection
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI || '');
        console.log('✅ Connected to MongoDB');
    }
    catch (err) {
        console.error('❌ Error connecting to MongoDB:', err);
        process.exit(1);
    }
});
// Start Server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectToDatabase();
        const port = config_1.config.PORT || 8080;
        app.listen({ port, host: '127.0.0.1' }, (err, address) => {
            if (err) {
                app.log.error(err);
                process.exit(1);
            }
            app.log.info(`Server running at ${address}`);
        });
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
});
startServer();
