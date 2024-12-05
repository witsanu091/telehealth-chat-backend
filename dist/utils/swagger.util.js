"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
const setupSwagger = (app) => {
    const HOST = process.env.HOST || "localhost";
    const PORT = config_1.config.PORT || 3000;
    app.register(autoload_1.default, {
        dir: path_1.default.join(__dirname, '../', 'routes')
    });
    // app.ready()
    // app.swagger()
    app.register(swagger_1.default, {
        swagger: {
            info: {
                title: "Socket.IO Chat API",
                description: "API Documentation for Socket.IO Chat System",
                version: "1.0.0",
            },
            host: `${HOST}:${PORT}`,
            schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                { name: "Authentication", description: "Endpoints for authentication" },
                { name: "Chat", description: "Chat-related endpoints" },
            ],
        },
    });
    app.register(swagger_ui_1.default, {
        routePrefix: "api-docs",
        uiConfig: {
            docExpansion: "full",
        },
        uiHooks: {
            onRequest: (request, reply, next) => next(),
            preHandler: (request, reply, next) => next(),
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        exposeRoute: true,
    });
};
exports.setupSwagger = setupSwagger;
