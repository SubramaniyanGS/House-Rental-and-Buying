import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure this line is at the top

console.log('MongoDB URI:', process.env.MONGO_URL); // Add this line

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected successfully to ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Error - ${error}`);
    }
};

export default connectDB;
