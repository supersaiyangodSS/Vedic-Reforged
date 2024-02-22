import express, { Request, Response, Express } from 'express';
import connectDB from './config/database.js';
import Auth_Router from './routes/auth.js';
import session from 'express-session';
connectDB();

const app : Express = express ();

const options = {
    secret: 'test', //TODO:
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false
    }
}

app.use(session(options));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ test: "node" });
});

app.use('/auth', Auth_Router);

export { app };
