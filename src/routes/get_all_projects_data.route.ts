import { Router } from 'express';
import GetAllProjectsDataController from '@controllers/get_all_projects_data.controller';
import { Routes } from '@interfaces/routes.interface';
import { Request, Response, NextFunction, RequestHandler } from 'express';

class GetAllProjectsRoute implements Routes {
  public path = '/projects';
  public router = Router();
  public controller = new GetAllProjectsDataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.controller.validators, this.wrapAsync(this.controller.index));
  }

  private wrapAsync(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>
  ): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  }
}
export default GetAllProjectsRoute;
