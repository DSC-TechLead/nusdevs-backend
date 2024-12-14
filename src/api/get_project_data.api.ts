import { getProject } from '@db/project';
import { HttpException } from '@exceptions/HttpException';
import { Identity } from '@interfaces/models.interface';
import { projectData, IdentityDataResponse } from '@models/project.model';
interface IdentityDataApiResponse extends IdentityDataResponse {
  identity: Identity;
}

const getProjectData = async (id: string): Promise<IdentityDataApiResponse> => {
  const project = await getProject(id);
  if (!project) {
    throw new HttpException(404, `Identity ${id} not found`);
  }

  const data = await projectData(project.id);
  return { project, ...data };
};

export { getProjectData };
