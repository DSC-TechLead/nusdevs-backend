import { logger } from '@utils/logger';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  // Assuming the token is sent in the Authorization header as "Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      // Decode the token
      const decodedToken = jwt.decode(token);
      if (!decodedToken) {
        return next();
      }

      for (const [key, value] of Object.entries(decodedToken)) {
        req.headers[key] = value as string;
      }
    } catch (e) {
      // Handle token decoding error
      logger.error('Error decoding token:', e);
    }
  }

  next();
};

export default jwtAuthMiddleware;
