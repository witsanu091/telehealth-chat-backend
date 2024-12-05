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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ChatRepository {
    static addChat(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.chat.create({
                    data,
                });
            }
            catch (error) {
                console.error("[Error] Adding chat log:", error);
                throw error;
            }
        });
    }
    static findOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.chat.findFirst({
                    where: { room: data.room_id },
                });
            }
            catch (error) {
                console.error("[Error] Fetching chat log:", error);
                throw error;
            }
        });
    }
    static findAllChatsByRoom(room_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.chat.findMany({
                    where: { room: room_id },
                    orderBy: { created_on: "asc" },
                });
            }
            catch (error) {
                console.error("[Error] Fetching chats by room:", error);
                throw error;
            }
        });
    }
}
exports.default = ChatRepository;
