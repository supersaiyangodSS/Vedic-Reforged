import { Request, Response } from "express";
import Sahity from "../models/sahity.js";

const uploadSahitya = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.json({ error: 'No file uploaded!' });
        }
        const jsonData = JSON.parse(req.file.buffer.toString());
        await Sahity.create(jsonData);
        res.json({ success: 'file uploaded' });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

export { uploadSahitya };
