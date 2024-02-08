import Sahity from "../models/sahity.js";
import { Request, Response } from "express";
import { errorLogger } from "../helpers/logger.js";

export const getSahity = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const sahity = await Sahity.find({});
        if (!sahity.length) {
            return res.status(404).json({ error: 'No stotras found' });
        }
        res.status(200).json(sahity);
    } catch (error) {
        console.log(error);
        errorLogger.error('API call error', {
            endpoint: `/api/sahity`,
            method: 'POST',
            ip: ip,
            error: error.message
        });
        res.status(500).json({ error: 'Internal server error' });
    }
}
