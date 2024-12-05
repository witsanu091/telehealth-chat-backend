import { FastifyInstance } from 'fastify';

import { getMessages, getRoomMessages } from '../controllers/chat.controller';

export default async function chatRoutes(fastify: FastifyInstance) {
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
    fastify.get('/messages/:room', getMessages);

    fastify.get("/chats/:room_id", getRoomMessages)
}


