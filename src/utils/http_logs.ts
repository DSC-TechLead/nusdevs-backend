import morgan from 'morgan';
import { maskObject } from '@utils/mask';
import { logger } from '@utils/logger';
import { Request, Response } from 'express';
import { TokenIndexer } from 'morgan';

const noLogPaths = ['/', '/metrics', '/ready', '/health'];

morgan.token('endpoint', function (req: Request) {
  return req.route?.path;
});
morgan.token('query', function (req: Request) {
  return req.query;
});
morgan.token('body', function (req: Request) {
  return maskObject(req.body);
});
morgan.token('statusCode', function (_req: Request, res: Response) {
  return res.statusCode;
});

const httpStream = {
  write: (message: string) => {
    const messageJson = JSON.parse(message);
    const { url, method, contentLength, responseTime } = messageJson;
    messageJson.message = `${method} - ${url} - ${responseTime} ms - ${contentLength} bytes`;
    messageJson.type = 'httpLog';
    logger.info(messageJson);
  },
};

const getHttpLogFormat = () =>
  morgan(
    (tokens: TokenIndexer, req: Request, res: Response) => {
      try {
        const path = req.route?.path;
        if (!path || noLogPaths.includes(path)) {
          return;
        }
        return JSON.stringify({
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          statusCode: tokens.statusCode(req, res),
          contentLength: tokens.res(req, res, 'content-length'),
          responseTime: tokens['response-time'](req, res),
          endpoint: tokens.endpoint(req, res),
          query: tokens.query(req, res),
          body: tokens.body(req, res),
        });
      } catch (error) {
        logger.info(error);
        return;
      }
    },
    { stream: httpStream }
  );

export { getHttpLogFormat };
