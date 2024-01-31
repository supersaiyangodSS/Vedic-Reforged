import { config } from 'dotenv';
config();
import express , { Request, Response, Express, NextFunction } from 'express';
import connectDB from './config/database.js';
import main from './router/main.js';
import auth from './router/auth.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Sahity from './models/sahity.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import crypto from 'crypto';
connectDB();

const app : Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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

app.post('/upload', isAuth, upload.single('jsonFile'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.json({ error: 'No file uploaded!' });
        }
        const jsonData = JSON.parse(req.file.buffer.toString());
        await Sahity.create(jsonData);
        res.json({ success: 'file uploaded' });
    } catch (error) {
        console.log(error);
        res.json(error) 
    }
})

app.use('/api', main)
app.use('/auth', auth)

export default app;
 