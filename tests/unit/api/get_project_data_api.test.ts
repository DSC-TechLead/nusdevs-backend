import { getProjectData } from '@api/get_project_data.api';
import { HttpException } from '@exceptions/HttpException';
import mockProjects from '@mock_data/projects.data';

describe('getProjectData', () => {
  it('should return project data for a valid ID', async () => {
    const validProjectId = '1';

    const project = await getProjectData(validProjectId);

    expect(project).toBeDefined();

    const expectedProject = mockProjects.find((proj) => proj.id === validProjectId);
    expect(project).toEqual(expectedProject);
  });

  it('should throw a 404 error if the project ID is not found', async () => {
    const invalidProjectId = 'invalid-id';

    await expect(getProjectData(invalidProjectId)).rejects.toThrow(HttpException);
    await expect(getProjectData(invalidProjectId)).rejects.toThrow(
      `Project with ID ${invalidProjectId} not found`
    );
  });
});
