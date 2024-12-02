import { FastifyReply, FastifyRequest } from 'fastify';
import { createToken } from '../services/token.service';

export const generateTokenForConsult = async (request: FastifyRequest, reply: FastifyReply) => {
    const { patient_id, room } = request.body as any;
    const token = createToken({ patient_id, room, role: 'consult' });
    reply.send({ chat_token: token });
};

export const generateTokenForPatient = async (request: FastifyRequest, reply: FastifyReply) => {
    const { consult_id, room } = request.body as any;
    const token = createToken({ consult_id, room, role: 'patient' });
    reply.send({ chat_token: token });
};
