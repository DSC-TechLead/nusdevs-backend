import { existsSync, mkdirSync } from 'fs';
import winston, { LoggerOptions } from 'winston';
import MaskData from 'maskdata';
import { LOG_DIR, NODE_ENV } from '@config/index';

const logDir = `./${LOG_DIR}`;

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// TODO: edit templated code when users have been implemented
const jsonMaskConfig = {
  passwordFields: ['password', 'body.password'],
  phoneFields: [
    'phone_number',
    'body.phone_number',
    'body.accounts[*].phone_number',
    'query.phone_number',
  ],
  stringMaskOptions: {
    maskWith: '*',
    maskOnlyFirstOccurance: false,
    values: [],
    maskAll: true,
  },
  genericStrings: [
    {
      config: {
        maskWith: '*',
        // This is to limit the maximun characters in the output.
        // Default value is 256
        maxMaskedCharacters: 256,
        // These are the default values for email mask options applied
        unmaskedStartCharacters: 3,
        unmaskedEndCharacters: 2,
      },
      fields: ['email', 'body.email', 'body.accounts[*].email', 'query.email'],
    },
  ],
};

const piiFormatter = winston.format((info) => {
  const maskedInfo = MaskData.maskJSON2(info, jsonMaskConfig);

  return { ...info, ...maskedInfo };
});

const colorizer = winston.format.colorize();
winston.addColors({ timestamp: 'bold blue' });
const devFormatter = winston.format.printf(({ level, message, timestamp, ...rest }) => {
  return `${colorizer.colorize('timestamp', '[' + timestamp + ']')} ${level}: ${message} ${JSON.stringify(rest)}`;
});

const envFormatters: winston.Logform.Format[] = [];

// Adds some extra flair do local-dev logs.
// Ingestable logs remain as JSON
if (NODE_ENV === 'local-dev') {
  envFormatters.push(winston.format.colorize());
  envFormatters.push(devFormatter);
}

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
//  */

const loggerOptions: LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    piiFormatter(),
    winston.format.json(),
    ...envFormatters
  ),
  transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(loggerOptions);

export { logger };
