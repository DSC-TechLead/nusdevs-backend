import { Router } from 'express';
import GetProjectDataController from '@controllers/get_project_data.controller';
import { Routes } from '@interfaces/routes.interface';
import { Request, Response, NextFunction, RequestHandler } from 'express';
// Internal route
//   - Not exposed by gateway
class GetProjectDataRoute implements Routes {
  public path = '/project/:id/data';
  public router = Router();
  public controller = new GetProjectDataController();

  constructor() {
    this.initializeRoutes();
  }

  /*
    TODO: Recommendation by Pairor
    Could add the types:
      (req: Request, res: Response, next: NextFunction) => {
        this.controller.index(req, res, next).catch(next);
  
    just for readability, replacing this.controller.index, 
    same logic for this.controller.validators.
  */

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

export default GetProjectDataRoute;
