import { NextFunction, Request, Response } from 'express';
import { getAllEvents } from '@api/get_all_events_data.api';
import { logger } from '@utils/logger';
import { validationResult } from 'express-validator';

class GetAllEventsDataController {
  /**
   * Controller method for getting all events data
   */
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error('Validation error:', { errors: errors.array() });
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const events = await getAllEvents();

      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };

  public validators = [];
}

export default GetAllEventsDataController;
