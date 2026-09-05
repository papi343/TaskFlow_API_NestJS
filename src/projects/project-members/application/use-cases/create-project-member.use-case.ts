import { Injectable } from "@nestjs/common";
import { ProjectMember } from "../../domain/entities/project-member.entity";
import { ProjectMembersRepository } from "../../domain/repositories/project-members.repository";


@Injectable()
export class CreateProjectMemberUseCase {

    constructor(private readonly projectMembersRepository: ProjectMembersRepository){}


    async execute(projectId: number, userId: number):Promise<ProjectMember>{
        const projectMember = new ProjectMember(null,projectId, userId);
        const existingProjectMember = await this.projectMembersRepository.create(projectMember);
        return existingProjectMember;
    }
}