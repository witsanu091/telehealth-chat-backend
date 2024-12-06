"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const room_repository_1 = __importDefault(require("../prisma/repository/room-repository"));
const utils_1 = require("../utils/utils");
/**
 * Check if a room exists and create one if it doesn't
 * @param room - The room ID to check
 * @returns The existing or newly created room ID
 */
const checkTokenEmpty = (room) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let roomData = yield room_repository_1.default.findRoomById({ room_id: room });
        if (!roomData) {
            const newRoomId = (0, utils_1.generateRoomId)();
            yield room_repository_1.default.createRoom({ room_id: newRoomId });
            return newRoomId;
        }
        return room;
    }
    catch (error) {
        console.error("🚀 Error in checkTokenEmpty:", error);
        throw new Error("Error while checking or creating room.");
    }
});
/**
 * Create a JWT token for the provided payload
 * @param payload - The payload to encode in the token (must include room)
 * @returns An object with the generated token and room ID
 */
const createToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.room || typeof payload.room !== 'string') {
        throw new Error("Payload must include a valid 'room' property.");
    }
    const room = yield checkTokenEmpty(payload.room);
    const token = jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, { expiresIn: '12h' });
    return { token, room_id: room };
});
exports.createToken = createToken;
const validateToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
        return decoded;
    }
    catch (error) {
        console.error('❌ Invalid token:', error);
        return null;
    }
};
exports.validateToken = validateToken;
