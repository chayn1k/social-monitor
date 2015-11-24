import winston, {Logger} from 'winston';
import Logentries from 'winston-logentries';
import fs from 'fs';
import path from 'path';

const logFile = path.join(__dirname, 'winston-logfile.log');
const exceptionLogFile = path.join(__dirname, 'exceptions-logfile.log');
const logentriesToken = '249d1881-6c71-3baf-aa6c-84961b14e82d';

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
            colorize: true,
            timestamp: true
        }),
        new (winston.transports.File)({
            level: 'warn',
            filename: logFile
        }),
        new (winston.transports.Logentries)({
            level: 'debug',
            token: logentriesToken
        })
    ],
    exceptionHandlers: [
        new winston.transports.Console({ colorize: true }),
        new winston.transports.File({ filename: exceptionLogFile }),
        new winston.transports.Logentries({ token: logentriesToken })
    ]
});

export default logger;
