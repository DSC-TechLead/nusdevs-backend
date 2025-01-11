import { NextFunction, Request, Response } from 'express';
import { getEventData } from '@api/get_event_data.api';
import { logger } from '@utils/logger';
import { validationResult, param } from 'express-validator';

class GetEventDataController {
  /**
   * Controller method for getting event data by ID
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

      const { id } = req.params;

      const event = await getEventData(id);

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };

  public validators = [
    param('id')
      .notEmpty()
      .withMessage('Event ID is required')
      .matches(/^[a-zA-Z0-9-]+$/)
      .withMessage('Event ID must be a valid UUID'),
  ];
}

export default GetEventDataController;
