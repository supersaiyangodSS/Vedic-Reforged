import rateLimit from 'express-rate-limit';
import requestIp from 'request-ip';
import { Request } from 'express';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 80,
    message: 'Too many requests, please try again later.',
    keyGenerator: (req: Request) => {
        return requestIp.getClientIp(req) || 'unknown';
    }
});

