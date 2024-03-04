import { CustomrError } from "../errors/customError.js";
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    if (err instanceof CustomrError) {
        res.status(err.statusCode).send(err.message);
    }
    else {
        res.status(500).send('Internal Server Error');
    }
}

export default errorHandler;
