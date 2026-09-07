import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../../domain/repositories/task.repository";
import { ProjectRepository } from "src/projects/domain/repositories/project.repository";
import {Task} from "../../domain/entities/task.entity"




@Injectable()
export class GetProjectTaskUseCase {
    constructor(private readonly taskRepository:TaskRepository,
        private readonly projectRepository:ProjectRepository,
    ){}

    async execute(projectId:number):Promise<Task[]>{
        const taskFounded = await this.taskRepository.findByProjectId(projectId)
        return taskFounded
    }
}