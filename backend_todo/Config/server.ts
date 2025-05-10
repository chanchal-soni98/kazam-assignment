import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(uri);
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
