import { getAllProjects } from '@api/get_all_project_data.api';
import mockProjects from '@mock_data/projects.data';

describe('getAllProjects', () => {
  it('should return all projects', async () => {
    const projects = await getAllProjects();

    expect(Array.isArray(projects)).toBe(true);

    expect(projects).toEqual(mockProjects);

    expect(projects.length).toBe(mockProjects.length);

    projects.forEach((project, index) => {
      expect(project).toHaveProperty('id', mockProjects[index].id);
      expect(project).toHaveProperty('company_id', mockProjects[index].company_id);
      expect(project).toHaveProperty('identity_id', mockProjects[index].identity_id);
      expect(project).toHaveProperty('created_at', mockProjects[index].created_at);
      expect(project).toHaveProperty('updated_at', mockProjects[index].updated_at);
    });
  });
});
