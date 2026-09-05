import { Injectable } from "@nestjs/common";
import { ProjectMember } from "../../domain/entities/project-member.entity";
import { ProjectMembersRepository } from "../../domain/repositories/project-members.repository";


@Injectable()
export class GetProjectMembersUseCase {
    constructor(private readonly projectMembersRepository: ProjectMembersRepository){}

    async execute(projectId:number):Promise<ProjectMember[]>{

        const projectMembers = await this.projectMembersRepository.findByProjectId(projectId);
        return projectMembers;

    }
}