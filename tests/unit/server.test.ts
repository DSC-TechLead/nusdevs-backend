import App from '@app';
import request from 'supertest';
import GetProjectDataRoute from '@routes/get_project_data.route';

let app: App;

jest.mock('@utils/logger', () => {
  return {
    logger: {
      info: jest.fn(),
      error: jest.fn(),
    },
    httpStream: {
      write: jest.fn(),
    },
  };
});

beforeEach(() => {
  app = new App([new GetProjectDataRoute()]);
});

afterEach(async () => {
  await app.close();
});

test('GET /project/:id/data returns 404 for invalid route', async () => {
  const res = await request(app.getServer()).get('/project/invalid-id/data');
  expect(res.status).toBe(404);
  expect(res.body).toHaveProperty('message');
  expect(res.body.message).toContain('Project with ID invalid-id not found');
});

test('GET /project/:id/data returns 200 for valid route', async () => {
  await app.listen();
  const res = await request(app.getServer()).get('/project/1/data');
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('id', '1');
});
