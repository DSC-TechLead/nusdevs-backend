import { NextFunction, Request, Response } from 'express';
import { getAllProjects } from '@api/get_all_project_data.api';
import { logger } from '@utils/logger';
import { validationResult } from 'express-validator';

class GetAllProjectsDataController {
  /**
   * Controller method for getting all projects data
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

      const projects = await getAllProjects();

      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  };

  public validators = [];
}
export default GetAllProjectsDataController;
