import { getProject } from '@db/project';
import { HttpException } from '@exceptions/HttpException';
import { Project } from '@interfaces/models.interface';
import { projectData, ProjectDataResponse } from '@models/project.model';
interface ProjectDataApiResponse extends ProjectDataResponse {
  project: Project;
}

const getProjectData = async (id: string): Promise<ProjectDataApiResponse> => {
  const project = await getProject(id);
  if (!project) {
    throw new HttpException(404, `Identity ${id} not found`);
  }

  const data = await projectData(project.id);
  return { project, ...data };
};

export { getProjectData };
