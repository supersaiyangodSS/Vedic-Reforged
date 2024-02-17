import { config } from 'dotenv';
config();
import { connect } from 'mongoose';
import chalk from 'chalk';
const log = console.log;

const mongoURI : string = process.env.DB || 'mongodb://127.0.0.1/27017/';

const connectDB = async () => {
    try {
        await connect(mongoURI);
        log(chalk.bgCyan('Connected to mongoose!'));
    } catch (error) {        
        log(chalk.bgRed('Mongoose connection failed!', error));
    }
}

export default connectDB;
