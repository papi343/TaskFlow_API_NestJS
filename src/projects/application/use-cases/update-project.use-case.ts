import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "../../domain/entities/project.entity";
import { NotFoundException } from "@nestjs/common";




@Injectable()

export class UpdateProjectUseCase {
    constructor (private readonly projectRepository: ProjectRepository,){}

    async execute (id:number, nom:string):Promise<Project>{
        const project = await this.projectRepository.findById(id);
        if(!project){
            throw new NotFoundException("project introuvable");
        }
        project.nom = nom;

        return this.projectRepository.update(project);
    }
}