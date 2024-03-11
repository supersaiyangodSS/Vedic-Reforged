import { config } from 'dotenv';
config();
import express, { Request, Response, Express } from 'express';
import connectDB from './config/database.js';
import AuthRouter from './routes/auth.js';
import cors from 'cors';
import createAdmin from './routes/createAdmin.js';
import auth from './auth/auth.js';
connectDB();

const app: Express = express ();

const sessionSecret: string | undefined = process.env.SESSION_SECRET;
if (!sessionSecret) {
    console.log('SESSION_SECRET environment variable is not defined.');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.get('/', auth, (req: Request, res: Response) => {
    res.status(200).json({ test: "node" });
});

app.use('/auth', AuthRouter);
app.use('/main', createAdmin);

export { app };
