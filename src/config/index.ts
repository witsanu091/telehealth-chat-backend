import dotenv from 'dotenv';
dotenv.config();

interface TypeConfig {
    PORT: number;
    JWT_SECRET: string;
    REDIS_URL: string;
    DATABASE_URL: string;
}
export const config: TypeConfig = {
    PORT: parseInt(process.env.PORT || "") || 8080,
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/chat',
};
