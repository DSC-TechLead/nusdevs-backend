import request from 'supertest';
import App from '@app';
import GetProjectDataRoute from '@routes/get_project_data.route';
import { getProjectData } from '@api/get_project_data.api';

jest.mock('@api/get_project_data.api', () => ({
  getProjectData: jest.fn(),
}));

describe('GetProjectDataRoute', () => {
  let app: App;

  beforeAll(() => {
    app = new App([new GetProjectDataRoute()]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 and project data for a valid ID', async () => {
    const mockProject = {
      id: '1',
      company_id: '1001',
      identity_id: '2001',
      created_at: '2025-01-01T12:00:00Z',
      updated_at: '2025-01-02T12:00:00Z',
    };

    (getProjectData as jest.Mock).mockResolvedValue(mockProject);

    const res = await request(app.getServer()).get('/project/1/data');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProject);
    expect(getProjectData).toHaveBeenCalledWith('1');
  });

  it('should return 404 if the project is not found', async () => {
    (getProjectData as jest.Mock).mockRejectedValue(new Error('Project not found'));

    const res = await request(app.getServer()).get('/project/invalid-id/data');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Project not found' });
    expect(getProjectData).toHaveBeenCalledWith('invalid-id');
  });
});
