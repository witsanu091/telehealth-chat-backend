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
exports.handleChatEvents = void 0;
const chat_model_1 = __importDefault(require("../models/chat.model"));
const handleChatEvents = (socket, io) => {
    const room = socket.handshake.query.room;
    if (!room) {
        console.warn(`⚠️ No room specified for client: ${socket.id}`);
        return;
    }
    console.log(`🔗 Client joined room: ${room}`);
    socket.on('join', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            socket.join(room);
            console.log(`✅ User joined room: ${room}`);
            yield chat_model_1.default.create({ room, sender: 'system', message: `User joined room: ${room}` });
        }
        catch (err) {
            console.error('❌ Error in join event:', err);
        }
    }));
    socket.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('📩 Message received:', data);
            const message = yield chat_model_1.default.create({ room, sender: data.sender, message: data.message });
            io.to(room).emit('message', message);
        }
        catch (err) {
            console.error('❌ Error in message event:', err);
        }
    }));
    socket.on('leave', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            socket.leave(room);
            console.log(`✅ User left room: ${room}`);
            yield chat_model_1.default.create({ room, sender: 'system', message: `User left room: ${room}` });
        }
        catch (err) {
            console.error('❌ Error in leave event:', err);
        }
    }));
};
exports.handleChatEvents = handleChatEvents;
