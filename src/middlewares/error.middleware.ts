import { NextFunction, Request } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { maskObject } from '@utils/mask';

const errorMiddleware = (error: HttpException, req: Request, res: any, next: NextFunction) => {
  try {
    const genericErrorMessage = 'Server error';
    const statusCode: number = error.status || 500;
    const logMessage = error.message || genericErrorMessage;

    const responseMessage: string = statusCode === 500 ? genericErrorMessage : error.message || genericErrorMessage;
    const messagePrefix = `[${req.method}] ${req.path} >> StatusCode:: ${statusCode}`;
    const logData = { statusCode, sentryID: res.sentry, method: req.method, path: req.path, error };

    logger.error(`${messagePrefix} - ${logMessage}`, maskObject(logData));
    res.status(statusCode).json({ errors: [responseMessage] });
  } catch (e) {
    next(e);
  }
};

export default errorMiddleware;
