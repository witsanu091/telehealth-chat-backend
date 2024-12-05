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
exports.connectRedis = void 0;
const redis_1 = require("redis");
const config_1 = require("../config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    const redisHost = config_1.config.REDIS_URL;
    try {
        const pubClient = (0, redis_1.createClient)({ url: redisHost });
        const subClient = pubClient.duplicate();
        pubClient.on('error', (err) => console.error('Redis PubClient Error:', err));
        subClient.on('error', (err) => console.error('Redis SubClient Error:', err));
        console.log('✅ Redis connected');
        yield Promise.all([pubClient.connect(), subClient.connect()]);
        return { pubClient, subClient };
    }
    catch (err) {
        console.error('❌ Error connecting to Redis:', err);
        throw new Error('Redis connection failed');
    }
});
exports.connectRedis = connectRedis;
