import App from '@app';
import GetProjectDataRoute from '@routes/get_project_data.route';
import GetAllProjectsRoute from '@routes/get_all_projects_data.route';
import GetAllEventsRoute from '@routes/get_all_events_data.route';
import GetEventDataRoute from '@routes/get_event_data.route';
export const app = new App([
  new GetProjectDataRoute(),
  new GetAllProjectsRoute(),
  new GetAllEventsRoute(),
  new GetEventDataRoute(),
]);

app.listen();
