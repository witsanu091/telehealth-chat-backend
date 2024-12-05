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
exports.default = chatRoutes;
const chat_controller_1 = require("../controllers/chat.controller");
function chatRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * @swagger
         * /api/chat/messages/{room}:
         *   get:
         *     summary: Get messages from a room
         *     tags: [Chat]
         *     parameters:
         *       - in: path
         *         name: room
         *         schema:
         *           type: string
         *         required: true
         *         description: The chat room ID
         *     responses:
         *       200:
         *         description: List of messages
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Chat'
         *       500:
         *         description: Server error
         */
        fastify.get('/messages/:room', chat_controller_1.getMessages);
        fastify.get("/chats/:room_id", chat_controller_1.getRoomMessages);
    });
}
