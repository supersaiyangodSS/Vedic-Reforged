import { Request, Response } from "express";
import { errorLogger } from "../helpers/logger.js";
import Stotram from "../models/stotram.js";

export const getStotra = async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const stotra = await Stotram.find({});
        if (!stotra.length) {
            return res.status(404).json({ error: 'No stotras found' });
        }
        res.status(200).json(stotra);
    } catch (error) {
        console.log(error);
        errorLogger.error('API call error', {
            endpoint: `/api/stotra`,
            method: 'POST',
            ip: ip,
            error: error.message
        });
        res.status(500).json({ error: 'Internal server error' });
    }
}