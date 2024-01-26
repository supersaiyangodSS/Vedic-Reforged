import Stotram from "../models/stotram.js";
import { Request, Response } from "express";

export const getStotras = async (req: Request, res: Response) => {
    const stotras = await Stotram.find({});
    if (!stotras) {
        return res.json({ error: 'error fetching stotras' });
    }
    res.json(stotras);
}
