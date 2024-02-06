import { config } from 'dotenv';
config();
import express , { Request, Response, Express, NextFunction } from 'express';
import connectDB from './config/database.js';
import cors from 'cors';
import main from './router/main.js';
import auth from './router/auth.js';
import uploader from './router/upload.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import crypto from 'crypto';
connectDB();

const app : Express = express();

const oneDay = 24 * 60 * 60 * 1000;
const sessionSecret = crypto.randomBytes(64).toString('hex');

const sessions = session({
    secret: process.env.SECRET || sessionSecret,
    resave: false,
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: oneDay,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB }),
    saveUninitialized: true,
})
app.use(cors())
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions);

function isAuth (req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user) {
        next();
    } else {
        return res.redirect('/auth')
    }
}

app.use('/api', main)
app.use('/auth', auth)
app.use('/upload', uploader)

export {app, isAuth} ;
 