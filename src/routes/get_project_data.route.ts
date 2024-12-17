import { Router } from 'express';
import GetProjectDataController from '@controllers/get_project_data.controller';
import { Routes } from '@interfaces/routes.interface';

// Internal route
//   - Not exposed by gateway
class GetProjectDataRoute implements Routes {
  public path = '/project/:id/data';
  public router = Router();
  public controller = new GetProjectDataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.validators, this.controller.index);
  }
}

export default GetProjectDataRoute;