import winston, { format, transports } from 'winston';

const reqLogger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'logs/api/req.log', level: 'http' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(info => {
            const ip = info.ip ? `- IP ${info.ip}` : '';
            const method = info.method ? `- Method ${info.method}` : '';
            const endpoint = info.endpoint ? `- Endpoint:" ${info.endpoint}` : '';
            const level = info.level ? `- Level: ${info.level}` : '';
            return `${info.timestamp} ${info.level} ${info.message} ${ip} ${method} ${endpoint} ${level}`
        })
    )
});

const errorLogger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(info => {
            const ip = info.ip ? `- IP ${info.ip}` : '';
            const method = info.method ? `- Method ${info.method}` : '';
            const endpoint = info.endpoint ? `- Endpoint:" ${info.endpoint}` : '';
            const level = info.level ? `- Level: ${info.level}` : '';
            return `${info.timestamp} ${info.level} ${info.message} ${ip} ${method} ${endpoint} ${level}`
        })
    )
});

export { reqLogger, errorLogger }