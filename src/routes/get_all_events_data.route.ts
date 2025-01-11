import { Router } from 'express';
import GetAllEventsDataController from '@controllers/get_all_events_data.controller.ts';
import { Routes } from '@interfaces/routes.interface';
import { Request, Response, NextFunction, RequestHandler } from 'express';

class GetAllEventsRoute implements Routes {
  public path = '/events';
  public router = Router();
  public controller = new GetAllEventsDataController();

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

export default GetAllEventsRoute;
