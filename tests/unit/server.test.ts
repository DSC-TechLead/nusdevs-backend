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

// test('getServer returns an express server', () => {
//   const server = app.getServer();
//   expect(server).toBeDefined();
//   expect(server).toHaveProperty('use');
//   expect(server).toHaveProperty('listen');
// });

// test('listen starts the server', (done) => {
//   app.listen();
//   setTimeout(() => {
//     request(app.getServer()).get('/').expect(404, done); // expect 404 Not Found because no routes are configured
//   }, 500); // wait for the server to start
// });

test('GET /project-data returns 200', (done) => {
  app.listen();
  setTimeout(() => {
    request(app.getServer()).get('/project-data').expect('Content-Type', /json/).expect(200, done);
  }, 500); // wait for the server to start
});
