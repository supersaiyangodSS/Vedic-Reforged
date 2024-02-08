import { Request, Response } from "express";
import Sahity from "../models/sahity.js";
import { errorLogger } from "../helpers/logger.js";
import Mantra from "../models/mantra.js";
import Stotram from "../models/stotram.js";

const uploadSahity = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        if (!req.file) {
            errorLogger.error('API call error', {
                endpoint: `/upload/sahity`,
                method: 'POST',
                ip: ip,
                error: 'no file uploaded!'
            })
            return res.json({ error: 'No file selected!' });
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

const uploadMantra = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        if (!req.file) {
            errorLogger.error('API call error', {
                endpoint: `/upload/mantra`,
                method: 'POST',
                ip: ip,
                error: 'no file uploaded!'
            })
            return res.status(404).json('No file selected!');
        }
        const jsonData = JSON.parse(req.file.buffer.toString());
        await Mantra.create(jsonData);
        res.json({ success: 'file uploaded' });
    } catch (error) {
        console.log(error);
        errorLogger.error('API call error', {
            endpoint: `/upload/mantra`,
            method: 'POST',
            ip: ip,
            error: error.message
        })
        res.json(error);
    }
}

const uploadStotra = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        if (!req.file) {
            errorLogger.error('API call error', {
                endpoint: `/upload/stotra`,
                method: 'POST',
                ip: ip,
                error: 'no file uploaded!'
            })
            return res.status(404).json('No file selected!');
        }
        const jsonData = JSON.parse(req.file.buffer.toString());
        await Stotram.create(jsonData);
        res.json({ success: 'file uploaded' });
    } catch (error) {
        console.log(error);
        errorLogger.error('API call error', {
            endpoint: `/upload/stotra`,
            method: 'POST',
            ip: ip,
            error: error.message
        })
        res.json(error);
    }
}

export { uploadSahity, uploadMantra, uploadStotra };
