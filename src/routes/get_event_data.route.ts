import { Router } from 'express';
import GetEventDataController from '@controllers/get_event_data.controller';
import { Routes } from '@interfaces/routes.interface';
import { Request, Response, NextFunction, RequestHandler } from 'express';

class GetEventDataRoute implements Routes {
  public path = '/events/:id/data';
  public router = Router();
  public controller = new GetEventDataController();

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

export default GetEventDataRoute;
