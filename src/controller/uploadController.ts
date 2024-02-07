import { Request, Response } from "express";
import Sahity from "../models/sahity.js";
import { errorLogger } from "../helpers/logger.js";

const uploadSahitya = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        if (!req.file) {
            errorLogger.error('API call error', {
                endpoint: `/upload/sahity`,
                method: 'POST',
                ip: ip,
                error: 'no file uploaded!'
            })
            return res.json({ error: 'No file uploaded!' });
            
        }
        const jsonData = JSON.parse(req.file.buffer.toString());
        await Sahity.create(jsonData);
        res.json({ success: 'file uploaded' });
    } catch (error) {
        console.log(error);
        errorLogger.error('API call error', {
            endpoint: `/upload/sahity`,
            method: 'POST',
            ip: ip,
            error: error.message
        })
        res.json(error);
    }
}

export { uploadSahitya };
