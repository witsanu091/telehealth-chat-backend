import mongoose from 'mongoose';

export default async function connectToDatabase() {
    const mongoUri = process.env.MONGO_URI || '';
    if (!mongoUri) {
        throw new Error('❌ MongoDB URI is not defined in environment variables.');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
}
