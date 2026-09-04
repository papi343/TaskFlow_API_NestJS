import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "../../domain/entities/project.entity";



@Injectable()
export class GetMyProjectsUseCase {
    constructor(private readonly projectRepository: ProjectRepository,){

    }

    async execute(ownerId: number): Promise<Project[]>{
        return this.projectRepository.findByOwnerId(ownerId);
    }
}