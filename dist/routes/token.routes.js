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
exports.default = tokenRoutes;
const token_controller_1 = require("../controllers/token.controller");
function tokenRoutes(fastify) {
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
        fastify.post('/token/generate-token', {
            schema: {
                tags: ["Authentication"], // จัดกลุ่มใน Swagger UI
                description: "Generate chat token for patient or consult",
                body: {
                    type: "object",
                    properties: {
                        patient_id: { type: "string", description: "Patient ID" },
                        consult_id: { type: "string", description: "Consult ID" },
                        room: { type: "string", description: "Room ID" },
                    },
                    required: ["room"], // Room เป็นฟิลด์ที่จำเป็น
                },
                response: {
                    200: {
                        description: "Generated chat token",
                        type: "object",
                        properties: {
                            chat_token: { type: "string", description: "JWT chat token" },
                            room_id: { type: "string", description: "room_id chat token" },
                        },
                    },
                    400: {
                        description: "Validation error",
                        type: "object",
                        properties: {
                            error: { type: "string", description: "Error message" },
                        },
                    },
                },
            },
        }, token_controller_1.generateToken);
    });
}
