import { Project } from "../entities/project.entity";



export abstract class ProjectRepository{
    abstract create(project:Project):Promise<Project>;
    abstract findById(id:number):Promise<Project|null>;
    abstract findByOwnerId(ownerId:number):Promise<Project[]>;
    abstract update(project:Project):Promise<Project>;
    abstract delete(id:number):Promise<void>;
}