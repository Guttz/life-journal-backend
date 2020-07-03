import expressWinston from 'express-winston';
import winston from 'winston';

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  expressFormat: true,
  colorize: false,
})

export default logger;