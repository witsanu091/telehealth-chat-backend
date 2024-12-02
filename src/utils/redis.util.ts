import { createClient } from 'redis';
import { config } from '../config';
import dotenv from 'dotenv';
dotenv.config();

export const connectRedis = async () => {
    const redisHost = config.REDIS_URL
    try {
        const pubClient = createClient({ url: redisHost });
        const subClient = pubClient.duplicate();

        pubClient.on('error', (err) => console.error('Redis PubClient Error:', err));
        subClient.on('error', (err) => console.error('Redis SubClient Error:', err));

        console.log('✅ Redis connected');
        await Promise.all([pubClient.connect(), subClient.connect()]);
        return { pubClient, subClient };
    } catch (err) {
        console.error('❌ Error connecting to Redis:', err);
        throw new Error('Redis connection failed');
    }
};

