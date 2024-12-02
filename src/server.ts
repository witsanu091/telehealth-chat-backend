import Fastify from 'fastify';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from '@fastify/cors';
import setupSwagger from './utils/swagger.util';
import chatRoutes from './routes/chat.routes';
import tokenRoutes from './routes/token.routes';
import fastifyIO from 'fastify-socket.io';

export default function createFastifyServer() {
    const app = Fastify();

    app.register(fastifyIO, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });


    const httpServer = createServer(app.server)

    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    // routes
    app.register(chatRoutes, { prefix: '/api' });
    app.register(tokenRoutes, { prefix: '/api' });
    app.get('/', async (_, res) => {
        return { message: 'Welcome to the Telehealth Chat API' };
    });

    setupSwagger(app);

    return { fastify: app, httpServer, io };
}
