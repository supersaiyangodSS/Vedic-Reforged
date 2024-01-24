import express , { Request, Response } from 'express';
import connectDB from './config/database.js';

const app = express();
connectDB();

export default app;
