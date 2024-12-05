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
exports.default = createFastifyServer;
const fastify_1 = __importDefault(require("fastify"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const swagger_util_1 = require("./utils/swagger.util");
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const token_routes_1 = __importDefault(require("./routes/token.routes"));
// import fastifyFormbody from "@fastify/formbody";
function createFastifyServer() {
    const app = (0, fastify_1.default)({ logger: true });
    app.register(fastify_socket_io_1.default, {
        cors: {
            origin: '*',
        },
    });
    app.register(chat_routes_1.default, { prefix: '/api' });
    app.register(token_routes_1.default, { prefix: '/api' });
    app.get('/', (_, res) => __awaiter(this, void 0, void 0, function* () {
        return { message: 'Welcome to the Telehealth Chat API' };
    }));
    (0, swagger_util_1.setupSwagger)(app);
    return { fastify: app };
}
