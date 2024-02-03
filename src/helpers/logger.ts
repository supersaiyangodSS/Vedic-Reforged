import winston, { format, transports, verbose } from 'winston';

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({
            filename: 'logs/http/req.log',
            level: 'http'
        })
    ]
});

const reqLogger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'logs/http/req.log', level: 'verbose' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(info => {
            const ip = info.ip ? ` - IP ${info.ip} ` : '';
            const method = info.method ? ` - Method ${info.method} ` : '';
            const endpoint = info.endpoint ? ` - Endpoint:" ${info.endpoint} ` : '';
            const level = info.level ? ` - Level: ${info.level} ` : '';
            return `${info.timestamp} ${info.level} ${info.message} ${ip} ${method} ${endpoint} ${level}`
        })
    )
})

export { reqLogger, logger }