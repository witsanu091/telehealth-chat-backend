import { FastifyInstance } from 'fastify';
import { generateToken } from '../controllers/token.controller';

export default async function tokenRoutes(fastify: FastifyInstance) {
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
    fastify.post(
        '/token/generate-token',
        {
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
        },
        generateToken
    );
}
