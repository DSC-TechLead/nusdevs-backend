import { NextFunction, Request, Response } from 'express';
import { getProjectData } from '@api/get_project_data.api';
import { logger } from '@utils/logger';
import { validationResult, matchedData, param } from 'express-validator';

// Example controller
class GetProjectDataController {
  public index = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

  public validators = [param('id').notEmpty()];
}

export default GetProjectDataController;
