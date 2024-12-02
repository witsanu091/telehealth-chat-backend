import { FastifyInstance } from 'fastify';
import { generateTokenForConsult, generateTokenForPatient } from '../controllers/token.controller';

export default async function tokenRoutes(fastify: FastifyInstance) {
    fastify.post('/token/consult', generateTokenForConsult);
    fastify.post('/token/patient', generateTokenForPatient);
}
