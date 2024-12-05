import { FastifyReply, FastifyRequest } from 'fastify';

import ChatRepository from '../prisma/repository/chat-repository';

export const getMessages = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { room } = request.params as any;
        const messages = await ChatRepository.findOne({ data: room })
        reply.status(200).send({ success: true, messages });
    } catch (error) {
        reply.status(500).send({ success: false, error });
    }
};


export const getRoomMessages = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { room_id } = request.params as { room_id: string };
        const messages = await ChatRepository.findAllChatsByRoom(room_id)
        reply.status(200).send({ success: true, messages });
    } catch (error) {
        reply.status(500).send({ success: false, error });
    }
};
