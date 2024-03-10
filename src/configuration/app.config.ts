import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    nodenv: process.env.NODE_ENV,
    swagger: {
        title: 'Taxi24-app',
        version: '1.0',
        path: 'swagger'
    }
}));