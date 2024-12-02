import dotenv from 'dotenv';
import createFastifyServer from './server';
import connectToDatabase from './utils/database.util';
import { setupSocketIO } from './sockets/index';

dotenv.config();

const PORT = parseInt(process.env.PORT || '', 10) || 3000;

(async () => {
    try {
        const { fastify, httpServer, io } = createFastifyServer();

        // Connect to the database
        console.log('🔄 Connecting to the database...');
        await connectToDatabase();
        console.log('✅ Database connection established.');

        // Setup WebSocket
        if (io) {
            console.log('🔄 Setting up WebSocket...');
            setupSocketIO(io);
            console.log('✅ WebSocket setup complete.');
        }

        await fastify.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log(`📚 API documentation at http://localhost:${PORT}/api-docs`);

    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
})();
