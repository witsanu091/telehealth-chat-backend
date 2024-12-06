import { FastifyReply, FastifyRequest } from 'fastify';
import { createToken } from '../services/token.service';

export const generateToken = async (request: FastifyRequest, reply: FastifyReply) => {
    const { patient_id, consult_id, room } = request.body as {
        patient_id?: string;
        consult_id?: string;
        room: string;
    };

    if (!room || (!patient_id && !consult_id)) {
        return reply.status(400).send({ error: 'Missing required fields' });
    }

    const payload = {
        room,
        role: patient_id ? 'consult' : 'patient',
        id: patient_id || consult_id,
    };
    const { token, room_id } = await createToken(payload);
    reply.send({ chat_token: token, room_id: room_id });
};

