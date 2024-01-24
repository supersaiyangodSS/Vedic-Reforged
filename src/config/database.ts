import { connect } from 'mongoose';
import { config } from 'dotenv';
config();

const mongoUri : string = process.env.DB || '';

const connectDB = async () => {
    try {
        await connect(mongoUri);
        console.log('MongoDB Connected');
        
    } catch (error) {
        console.log('MongoDB Connection Failed!');
        
    }
}

export default connectDB;
