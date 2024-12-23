import { HttpException } from '@exceptions/HttpException';
import { ProjectData } from '@interfaces/models.interface';

const getProjectData = async (id: string): Promise<ProjectData> => {
  // TODO: Implement get project data from rds
  const project = null;
  if (!project) {
    throw new HttpException(404, `Identity ${id} not found`);
  }

  return project;
};

export { getProjectData };
