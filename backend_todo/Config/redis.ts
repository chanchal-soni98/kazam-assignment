import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
});

redisClient.connect()
    .then(() => {
        console.log('Redis connected');
    })
    .catch((error) => { 
        console.error('Redis connection error:', error);
    });

export default redisClient;
