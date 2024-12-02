import setupSwagger from './utils/swagger.util';
import chatRoutes from './routes/chat.routes';
import tokenRoutes from './routes/token.routes';

import fastify from 'fastify';
import fastifySocketIO from 'fastify-socket.io';


export default function createFastifyServer() {

    const app = fastify({ logger: true });

    app.register(fastifySocketIO, {
        cors: {
            origin: '*',
        },
    });

    app.register(chatRoutes, { prefix: '/api' });
    app.register(tokenRoutes, { prefix: '/api' });
    app.get('/', async (_, res) => {
        return { message: 'Welcome to the Telehealth Chat API' };
    });

    setupSwagger(app);

    return { fastify: app };
}

