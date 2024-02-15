import express, { Request, Response, Express } from 'express';

const app : Express = express ();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ test: "node" })
})

export default app;
