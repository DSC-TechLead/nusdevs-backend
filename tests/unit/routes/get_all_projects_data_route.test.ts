import request from 'supertest';
import App from '@app';
import GetAllProjectsRoute from '@routes/get_all_projects_data.route';
import { getAllProjects } from '@api/get_all_project_data.api';

jest.mock('@api/get_all_project_data.api', () => ({
  getAllProjects: jest.fn(),
}));

describe('GetAllProjectsRoute', () => {
  let app: App;

  beforeAll(() => {
    app = new App([new GetAllProjectsRoute()]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 and list of projects on success', async () => {
    const mockProjects = [
      {
        id: '1',
        company_id: '1001',
        identity_id: '2001',
        created_at: '2025-01-01T12:00:00Z',
        updated_at: '2025-01-02T12:00:00Z',
      },
      {
        id: '2',
        company_id: '1002',
        identity_id: '2002',
        created_at: '2025-01-01T12:00:00Z',
        updated_at: '2025-01-02T12:00:00Z',
      },
    ];

    (getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

    const res = await request(app.getServer()).get('/projects');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProjects);
    expect(getAllProjects).toHaveBeenCalledTimes(1);
  });

  it('should return 500 if the service throws an error', async () => {
    (getAllProjects as jest.Mock).mockRejectedValue(new Error('Server error'));

    const res = await request(app.getServer()).get('/projects');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ errors: ['Server error'] });
    expect(getAllProjects).toHaveBeenCalledTimes(1);
  });
});
