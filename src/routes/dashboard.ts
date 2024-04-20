import { Router, Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.render('dashboard', {
        title: 'Shri Swami Samarth'
    });
});

export default router;
