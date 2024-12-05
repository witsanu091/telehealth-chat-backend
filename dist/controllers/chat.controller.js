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
exports.getRoomMessages = exports.getMessages = void 0;
const chat_repository_1 = __importDefault(require("../prisma/repository/chat-repository"));
const getMessages = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { room } = request.params;
        const messages = yield chat_repository_1.default.findOne({ data: room });
        reply.status(200).send({ success: true, messages });
    }
    catch (error) {
        reply.status(500).send({ success: false, error });
    }
});
exports.getMessages = getMessages;
const getRoomMessages = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { room_id } = request.params;
        const messages = yield chat_repository_1.default.findAllChatsByRoom(room_id);
        reply.status(200).send({ success: true, messages });
    }
    catch (error) {
        reply.status(500).send({ success: false, error });
    }
});
exports.getRoomMessages = getRoomMessages;
