import { config } from 'dotenv';
config();
import express, { Request, Response, Express, NextFunction } from 'express';
import connectDB from './config/database.js';
import Auth_Router from './routes/auth.js';
import sessions from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import errorHandler from './middleware/errorHandler.js';
connectDB();

const app: Express = express ();

const oneDay: number = 24 * 60 * 60 * 1000;
const sessionSecret: string | undefined = process.env.SESSION_SECRET;
if (!sessionSecret) {
    console.log('SESSION_SECRET environment variable is not defined.');
    process.exit(1);
}

const options = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: oneDay,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB }),
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions(options));
app.use(cors());
app.use(express.static('public'));
app.use(errorHandler);
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ test: "node" });
});

app.use('/auth', Auth_Router);

export { app };
