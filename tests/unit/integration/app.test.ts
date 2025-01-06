import request from 'supertest';
import App from '@app';
import GetProjectDataRoute from '@routes/get_all_projects_data.route';
import GetAllEventsRoute from '@routes/get_all_events_data.route';
import GetEventDataRoute from '@routes/get_event_data.route';
import GetAllProjectsRoute from '@routes/get_all_projects_data.route';
const app = new App([
  new GetProjectDataRoute(),
  new GetAllProjectsRoute(),
  new GetAllEventsRoute(),
  new GetEventDataRoute(),
]);
const appInstance = app.getServer();
describe('App Integration Tests', () => {
  it('GET /projects - should return all projects', async () => {
    const res = await request(appInstance).get('/projects');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('GET /events - should return all events', async () => {
    const res = await request(appInstance).get('/events');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('GET /events/:id/data - should return event data for valid ID', async () => {
    const res = await request(appInstance).get('/events/1/data');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('event_id', '1');
  });

  it('GET /events/:id/data - should return 404 for invalid ID', async () => {
    const res = await request(appInstance).get('/events/invalid-id/data');
    expect(res.status).toBe(404);
    expect(res.body.errors).toContain('Event with ID invalid-id not found');
  });
});
