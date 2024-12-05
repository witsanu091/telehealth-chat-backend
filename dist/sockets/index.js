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
exports.setupSocketIO = setupSocketIO;
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_util_1 = require("../utils/redis.util");
const chat_service_1 = require("../services/chat.service");
const token_service_1 = require("../services/token.service");
function setupSocketIO(io) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pubClient, subClient } = yield (0, redis_util_1.connectRedis)();
        io.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
        console.log('✅ Redis connected');
        pubClient.on('connect', () => console.log('Redis pubClient connected'));
        subClient.on('connect', () => console.log('Redis subClient connected'));
        io.use((socket, next) => {
            let token = socket.handshake.headers.token;
            console.log('Received token:', token);
            if (!token) {
                console.warn('⚠️ No token provided');
                return next(new Error('Authentication error: No token provided'));
            }
            const tokenString = Array.isArray(token) ? token[0] : token;
            const decoded = (0, token_service_1.validateToken)(tokenString);
            if (!decoded) {
                console.warn('⚠️ Invalid token');
                return next(new Error('Authentication error: Invalid token'));
            }
            // socket.data.sender = decoded.sender;
            socket.data = decoded;
            console.log(`✅ Token validated for user: ${decoded.room || 'unknown'}`);
            next();
        });
        io.on('connection', (socket) => {
            console.log(`🔗 Client connected: ${socket.id}`);
            (0, chat_service_1.handleChatEvents)(socket, io);
            socket.on('disconnect', () => {
                console.log(`❌ Client disconnected: ${socket.id}`);
            });
        });
    });
}
