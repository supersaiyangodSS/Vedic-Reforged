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
connectDB();

const app : Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sessions = session({
    secret: 'jfelijkjfks', //TODO:
    resave: false,
    saveUninitialized: true,
})

app.use(express.static('public'));
app.use(express.json());
app.use(sessions);


const uploadPage = join(__dirname, '../public/upload.html');

function isAuth (req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user) {
        console.log('logged in');        
        next();
    }
    console.log('logged out');
    return res.redirect('/login')
}

app.get('/', isAuth, (req: Request, res: Response) => {
    res.sendFile(uploadPage);
})

app.post('/upload', upload.single('jsonFile'), async (req: Request, res: Response) => {
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

app.get('/login', async (req: Request, res: Response) => {
    try {
        res.send('login')
    } catch (error) {
        res.send(error);
        console.log(error);    
    }
})

app.use('/api', main)
app.use('/auth', auth)

export default app;
