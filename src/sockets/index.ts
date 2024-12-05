import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { connectRedis } from '../utils/redis.util';
import { handleChatEvents } from '../services/chat.service';
import { validateToken } from '../services/token.service';

export async function setupSocketIO(io: Server) {
    const { pubClient, subClient } = await connectRedis();
    io.adapter(createAdapter(pubClient, subClient));

    console.log('✅ Redis connected');
    pubClient.on('connect', () => console.log('Redis pubClient connected'));
    subClient.on('connect', () => console.log('Redis subClient connected'));


    io.use((socket, next) => {
        let token = socket.handshake.headers.token;

        console.log('Received token:', token);
        if (!token) {
            console.warn('⚠️ No token provided');
            return next(new Error('Authentication error: No token provided'));
        }
        const tokenString = Array.isArray(token) ? token[0] : token;
        const decoded = validateToken(tokenString);
        if (!decoded) {
            console.warn('⚠️ Invalid token');
            return next(new Error('Authentication error: Invalid token'));
        }

        // socket.data.sender = decoded.sender;
        socket.data = decoded;
        console.log(`✅ Token validated for user: ${decoded.room || 'unknown'}`);
        next();
    });

    io.on('connection', (socket) => {
        console.log(`🔗 Client connected: ${socket.id}`);

        handleChatEvents(socket, io);

        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });
}
