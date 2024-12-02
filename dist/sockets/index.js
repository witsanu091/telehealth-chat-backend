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
exports.initializeSocket = void 0;
const chat_events_1 = require("../events/chat.events");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_util_1 = require("../utils/redis.util");
const initializeSocket = (io) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pubClient, subClient } = yield (0, redis_util_1.connectRedis)();
        io.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
        console.log('✅ Socket.IO Redis adapter initialized');
        io.on('connection', (socket) => {
            console.log(`🔗 Client connected: ${socket.id}`);
            // Log handshake query
            console.log('Handshake query:', socket.handshake.query);
            // จัดการ Events
            (0, chat_events_1.handleChatEvents)(socket, io);
            // Log errors on disconnect
            socket.on('disconnect', (reason) => {
                console.log(`❌ Client disconnected: ${socket.id}, reason: ${reason}`);
            });
            socket.on('error', (err) => {
                console.error('❌ Socket error:', err);
            });
        });
    }
    catch (err) {
        console.error('❌ Socket.IO initialization failed:', err);
        throw new Error('Socket.IO setup failed');
    }
});
exports.initializeSocket = initializeSocket;
