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
class RoomRepository {
    static findRoomById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let roomData = yield prisma.room.findUnique({
                    where: {
                        room_id: data.room,
                    },
                    include: { members: true },
                });
                return roomData;
            }
            catch (error) {
                console.error("[Error] Finding room:", error);
                throw error;
            }
        });
    }
    static createRoom(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.room.create({
                    data,
                    include: { members: true },
                });
            }
            catch (error) {
                console.error("[Error] Creating room:", error);
                throw error;
            }
        });
    }
}
exports.default = RoomRepository;
