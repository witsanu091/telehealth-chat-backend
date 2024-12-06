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
const utils_1 = require("../utils/utils");
const room_repository_1 = __importDefault(require("../prisma/repository/room-repository"));
const member_repository_1 = __importDefault(require("../prisma/repository/member-repository"));
const chat_repository_1 = __importDefault(require("../prisma/repository/chat-repository"));
const handleChatEvents = (socket, io) => {
    let { room, id } = socket.data;
    socket.on("join", () => __awaiter(void 0, void 0, void 0, function* () {
        let roomData = yield room_repository_1.default.findRoomById({ room_id: room });
        if (!roomData) {
            room = (0, utils_1.generateRoomId)();
            roomData = yield room_repository_1.default.createRoom({ room_id: room });
        }
        const isMember = roomData.members.some((member) => member.user_id === id);
        if (roomData.members.length >= 2) {
            socket.emit("error", { message: "Room is full!" });
            return;
        }
        if (!isMember) {
            yield member_repository_1.default.addMember({
                user_id: id,
                socket_id: socket.id,
                room_id: room,
            });
        }
        socket.join(room);
        io.to(room).emit("notification", { user_id: id, event: "join" });
        yield chat_repository_1.default.addChat({
            room,
            sender: id,
            message: `${id} joined the room`,
            event: "join",
        });
    }));
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const roomData = yield room_repository_1.default.findRoomById({ room_id: room, user_id: id });
        console.log("🚀  roomData.members:", roomData === null || roomData === void 0 ? void 0 : roomData.members);
        if (!roomData || !roomData.members.some((member) => {
            member.user_id === id;
            console.log("🚀  member.user_id:", member.user_id);
        })) {
            socket.emit("error", { message: "You are not a member of this room" });
            return;
        }
        io.to(room).emit("message", { sender: id, message });
        yield chat_repository_1.default.addChat({
            room,
            sender: id,
            message,
            event: "message",
        });
    }));
    socket.on("leave", () => __awaiter(void 0, void 0, void 0, function* () {
        const roomData = yield room_repository_1.default.findRoomById({ room_id: room, user_id: id });
        if (roomData) {
            yield member_repository_1.default.deleteMemberBySocketId(socket.id);
        }
        socket.leave(room);
        io.to(room).emit("notification", { user_id: id, event: "leave" });
        yield chat_repository_1.default.addChat({
            room,
            sender: id,
            message: `${id} left the room`,
            event: "leave",
        });
    }));
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("User disconnected:", socket.id);
        yield member_repository_1.default.deleteMemberBySocketId(socket.id);
        io.to(room).emit("notification", {
            user_id: id,
            event: "leave",
        });
    }));
};
exports.handleChatEvents = handleChatEvents;
