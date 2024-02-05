import Sahity from "../models/sahity.js";
import { Request, Response } from "express";

export const getSahity = async (req: Request, res: Response) => {
    const sahity = await Sahity.find({});
    if (!sahity) {
        return res.json({ error: 'error fetching stotras' });
    }
    res.json(sahity);
}
