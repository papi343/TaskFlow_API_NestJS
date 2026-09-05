import { ProjectMember } from '../entities/project-member.entity';





export  abstract class ProjectMembersRepository {
     abstract create(projectMember:ProjectMember):Promise<ProjectMember>;
      abstract findByProjectId(projectId:number): Promise<ProjectMember[]>;
    //   abstract findByUserId(userId:number):Promise<ProjectMember[]>;
      abstract findByProjectIdAndUserId(projectId:number,userId:number):Promise<ProjectMember|null>;
}