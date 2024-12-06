import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import RoomRepository from '../prisma/repository/room-repository';
import { generateRoomId } from '../utils/utils';

/**
 * Check if a room exists and create one if it doesn't
 * @param room - The room ID to check
 * @returns The existing or newly created room ID
 */
const checkTokenEmpty = async (room: string): Promise<string> => {
    try {
        let roomData = await RoomRepository.findRoomById({ room_id: room });

        if (!roomData) {
            const newRoomId = generateRoomId();
            await RoomRepository.createRoom({ room_id: newRoomId });
            return newRoomId;
        }

        return room;
    } catch (error: any) {
        console.error("🚀 Error in checkTokenEmpty:", error);
        throw new Error("Error while checking or creating room.");
    }
};

/**
 * Create a JWT token for the provided payload
 * @param payload - The payload to encode in the token (must include room)
 * @returns An object with the generated token and room ID
 */
export const createToken = async (payload: Record<string, unknown>): Promise<{ token: string; room_id: string }> => {
    if (!payload.room || typeof payload.room !== 'string') {
        throw new Error("Payload must include a valid 'room' property.");
    }

    const room = await checkTokenEmpty(payload.room);
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '12h' });

    return { token, room_id: room };
};

/**
 * Decode and validate a JWT token
 * @param token - The JWT token to validate
 * @returns The decoded token payload or null if invalid
 */
interface DecodedToken extends JwtPayload {
    sender?: string;
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
