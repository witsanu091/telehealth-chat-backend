import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';

export const createToken = (payload: Record<string, unknown>): string => {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
};


interface DecodedToken extends JwtPayload {
    userId?: string;
    // Add more fields as per your token structure
}

export const validateToken = (token: string): DecodedToken | null => {
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as DecodedToken;
        return decoded;
    } catch (error) {
        console.error('❌ Invalid token:', error);
        return null;
    }
};