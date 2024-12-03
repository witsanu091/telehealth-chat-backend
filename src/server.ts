import fastify from 'fastify';
import fastifySocketIO from 'fastify-socket.io';
import { setupSwagger } from './utils/swagger.util';
import chatRoutes from './routes/chat.routes';
import tokenRoutes from './routes/token.routes';
// import fastifyFormbody from "@fastify/formbody";


export default function createFastifyServer() {


    const app = fastify({ logger: true });
    // app.register(fastifyFormbody);

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

