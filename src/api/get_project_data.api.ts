import { HttpException } from '@exceptions/HttpException';
import { ProjectData } from '@interfaces/models.interface';
import mockProjects from 'src/mock_data/projects.data';

const getProjectData = async (id: string): Promise<ProjectData> => {
  console.log('Searching for project ID:', id);

  const project = mockProjects.find((project) => project.id === id);

  if (!project) {
    throw new HttpException(404, `Project with ID ${id} not found`);
  }

  return project;
};

export { getProjectData };
