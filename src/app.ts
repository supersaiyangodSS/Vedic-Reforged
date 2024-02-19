import express, { Request, Response, Express } from 'express';
import connectDB from './config/database.js';
import Auth_Router from './routes/auth.js';
connectDB();

const app : Express = express ();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ test: "node" });
});

app.use('/auth', Auth_Router);

export { app };
