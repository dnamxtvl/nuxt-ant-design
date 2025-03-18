import fs from 'fs';
import path from 'path';

const logDir = import.meta.server ? path.resolve(process.cwd(), 'logs') : '';

if (import.meta.server && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logToFile = (level: string, message: string | object) => {
  if (import.meta.server) {
    const config = useRuntimeConfig();
    const now = new Date();
    const jstOffset = config.public.APP_ENV === 'production' ? (9 * 60 * 60 * 1000) : (7 * 60 * 60 * 1000); // JP UTC in production, VN UTC in development
    const jstTime = new Date(now.getTime() + jstOffset);
    const timestamp = jstTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const logMessage = typeof message === 'object'
    ? `${timestamp} [${level.toUpperCase()}] ${JSON.stringify(message, null, 2)}\n`
    : `${timestamp} [${level.toUpperCase()}] ${message}\n`;
    const fileDate = jstTime.toISOString().split('T')[0];
    const logFile = path.join(logDir, `${fileDate}.log`);

    fs.appendFileSync(logFile, logMessage);
  }
};

const logger = {
  info: (message: string | object) => logToFile('info', message),
  debug: (message: string | object) => logToFile('debug', message),
  error: (message: string | object) => logToFile('error', message),
};

export default logger;