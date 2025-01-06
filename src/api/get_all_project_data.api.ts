import { ProjectData } from '@interfaces/models.interface';
import mockProjects from '@mock_data/projects.data';

const getAllProjects = async (): Promise<ProjectData[]> => {
  console.log('Fetch all projects');
  return mockProjects;
};

export { getAllProjects };
