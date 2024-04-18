import winston from 'winston';
const routeLogger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'logs/route/routeCalls.log', level: 'verbose', })
    ],
    format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.printf(info => {
        const ip = info.ip ? ` - IP: ${info.ip}` : '';
        const method = info.method ? ` - Method ${info.method}` : '';
        const endpoint = info.endpoint ? ` - Endpoint: ${info.endpoint}` : '';
        const level = info.level ? ` - Level: ${info.level} ` : '';
        return `${info.timestamp} ${info.level} ${info.message}${ip}${method}${endpoint}${level}`;
    })),
});
export { routeLogger };
//# sourceMappingURL=logger.js.map