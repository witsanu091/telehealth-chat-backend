import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyAutoload from "@fastify/autoload";


import { config } from "../config";
import path from "path";

export const setupSwagger = (app: FastifyInstance): void => {
    const HOST = process.env.HOST || "localhost";
    const PORT = config.PORT || 3000;

    app.register(fastifyAutoload, {
        dir: path.join(__dirname, '../', 'routes')
    })
    // app.ready()
    // app.swagger()


    app.register(fastifySwagger, {
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

    app.register(fastifySwaggerUi as any, {
        routePrefix: "api-docs",
        uiConfig: {
            docExpansion: "full",
        },
        uiHooks: {
            onRequest: (request: any, reply: any, next: any) => next(),
            preHandler: (request: any, reply: any, next: any) => next(),
        },
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        exposeRoute: true,

    });
};
