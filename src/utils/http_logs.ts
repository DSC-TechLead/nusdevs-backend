import morgan from 'morgan';
import { maskObject } from '@utils/mask';
import { logger } from '@utils/logger';

const noLogPaths = ['/', '/metrics', '/ready', '/health'];

morgan.token('endpoint', function (req: any) {
  return req.route?.path;
});
morgan.token('query', function (req: any) {
  return req.query;
});
morgan.token('body', function (req: any) {
  return maskObject(req.body);
});
morgan.token('statusCode', function (_req: any, res: any) {
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
    (tokens, req, res) => {
      const path = req['route']?.path;
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
    },
    { stream: httpStream },
  );

export { getHttpLogFormat };
