import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "../../domain/entities/project.entity";



@Injectable()
export class CreateProjectUseCase {

    constructor(private readonly projectRepository: ProjectRepository,){}


    async execute(nom:string, ownerId:number):Promise<Project>{

        const project = new Project(null,nom,ownerId)
        return await this.projectRepository.create(project);
    }
}