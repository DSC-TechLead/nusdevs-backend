import { NextFunction, Request, Response } from 'express';
import { getProjectData } from '@api/get_project_data.api';
import { logger } from '@utils/logger';
import { validationResult, matchedData, param } from 'express-validator';

// Example controller
class GetProjectDataController {
  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validates the path parameters
      const paramsErrors = validationResult(req);
      if (!paramsErrors.isEmpty()) {
        logger.error('Error in param validation:', paramsErrors.array());
        res.status(400).json({ errors: paramsErrors.array() });
        return next();
      }
      const paramsData = matchedData(req);

      // Fetches the identity data
      const result = await getProjectData(paramsData.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // TODO: Recommendation by Pairor
  // Can have beefier validators like a .withMessage('..') clause or even an isUUID() clause if applicable.
  public validators = [param('id').notEmpty()];
}

export default GetProjectDataController;
