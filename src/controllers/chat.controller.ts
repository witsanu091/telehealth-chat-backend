import { FastifyReply, FastifyRequest } from 'fastify';

import Chat from '../models/chat.model';

export const saveMessage = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { room, sender, message } = request.body as any;
        const chat = new Chat({ room, sender, message });
        await chat.save();
        reply.status(200).send({ success: true, chat });
    } catch (error) {
        reply.status(500).send({ success: false, error });

    }
};

export const getMessages = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { room } = request.params as any;
        const messages = await Chat.find({ room }).sort({ timestamp: 1 });
        reply.status(200).send({ success: true, messages });
    } catch (error) {
        reply.status(500).send({ success: false, error });
    }
};
