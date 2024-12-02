import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import dotenv from 'dotenv'

dotenv.config()

export default async (fastify: any) => {
    const port = process.env.PORT
    fastify.register(swagger, {
        swagger: {
            openapi: '3.0.0',
            info: {
                title: 'Telehealth Chat API',
                version: '1.0.0',
                description: 'API documentation for the Telehealth Chat system',
            },
            servers: [
                {
                    url: `http://localhost:${port}`,
                },
            ],
        },
    });

    fastify.register(swaggerUI, {
        routePrefix: '/api-docs', // URL for Swagger UI
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },

    });

    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};


