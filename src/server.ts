import App from '@app';
import GetProjectDataRoute from '@routes/get_project_data.route';

export const app = new App([
  new GetProjectDataRoute(),
]);

app.listen();
