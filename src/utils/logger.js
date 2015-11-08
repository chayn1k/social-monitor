import winston, {Logger} from 'winston';
import fs from 'fs';
import path from 'path';

const logFile = path.join(__dirname, 'winston-logfile.log');
const exceptionLogFile = path.join(__dirname, 'exceptions-logfile.log');

// Remove log file, ignoring any errors
try {
    fs.unlinkSync(logFile);
    fs.unlinkSync(exceptionLogFile);
} catch (ex) {
    // ignore
}

const logger = new Logger({
    transports: [
        new (winston.transports.Console)({
            level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warn',
            colorize: true
        }),
        new (winston.transports.File)({
            level: 'warn',
            filename: logFile
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: exceptionLogFile })
    ]
});

export default logger;
