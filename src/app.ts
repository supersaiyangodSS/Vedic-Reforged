import express , { Request, Response, Express } from 'express';
import connectDB from './config/database.js';
import main from './router/main.js';
import multer from 'multer';
import path from 'path';
import Sahity from './models/sahity.js';

const app = express();
connectDB();

app.use(express.static('public'));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

app.use('/api', main)

export default app;
