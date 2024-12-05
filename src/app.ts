import dotenv from 'dotenv';
import createFastifyServer from './server';

import { setupSocketIO } from './sockets/index';
import { Server as SocketIOServer } from "socket.io";
import { migrateDatabase } from './utils/database.util';


dotenv.config();

const PORT = parseInt(process.env.PORT || '', 10) || 3000;

(async () => {
    try {
        const { fastify } = createFastifyServer();

        // Connect to the database
        console.log('🔄 Connecting to the database...');
        // await migrateDatabase();
        console.log('✅ Database connection established.');

        fastify.ready().then(() => {
            console.log('🔄 Setting up WebSocket...');
            setupSocketIO(fastify.io);
            console.log('✅ WebSocket setup complete.');
        })

        await fastify.listen({ port: PORT, host: '0.0.0.0' });


        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log(`📚 API documentation at http://localhost:${PORT}/api-docs`);


    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
})();

declare module "fastify" {
    interface FastifyInstance {
        io: SocketIOServer;
    }
}