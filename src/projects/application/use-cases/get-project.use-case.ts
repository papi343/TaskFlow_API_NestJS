import { Injectable ,NotFoundException} from "@nestjs/common";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "../../domain/entities/project.entity";





@Injectable()
export class GetProjectUseCase {
    constructor( private readonly projectRepository: ProjectRepository,){

    }

    async execute(id:number):Promise<Project | null>{

        const project = await this.projectRepository.findById(id);
        if(!project){
            throw new NotFoundException(" project introuvable");
        }

        return project;
    }
}