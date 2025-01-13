import { NextFunction, Request, Response } from 'express';
import { getProjectData } from '@api/get_project_data.api';
import { logger } from '@utils/logger';
import { validationResult, param } from 'express-validator';

class GetProjectDataController {
  /**
   * Controller method for getting project data by ID
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

      const project = await getProjectData(id);

      res.status(200).json(project);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      } else {
        next(error);
      }
    }
  };
  // TODO: Recommendation by Pairor
  // Can have beefier validators like a .withMessage('..') clause or even an isUUID() clause if applicable.
  public validators = [
    param('id')
      .notEmpty()
      .withMessage('Project ID is required')
      .matches(/^[a-zA-Z0-9-]+$/)
      .withMessage('Project ID must be a valid UUID'),
  ];
}

export default GetProjectDataController;
