import express, { Request, Response, Express } from 'express';
import connectDB from './config/database.js';
import Auth_Router from './routes/auth.js';
import session from 'express-session';
import cors from 'cors';
import MongoStore from 'connect-mongo';
connectDB();

const app : Express = express ();

const oneDay = 24 * 60 * 60 * 1000;
const options = {
    secret: 'test', //TODO:
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
app.use(session(options));
app.use(cors());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ test: "node" });
});

app.use('/auth', Auth_Router);

export { app };
