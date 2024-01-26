import express , { Request, Response } from 'express';
import connectDB from './config/database.js';
import main from './router/main.js';

const app = express();
connectDB();

app.use('/api', main)

export default app;
