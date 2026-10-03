import { Inject, Injectable } from "@nestjs/common";
import { TaskRepository } from "../../domain/repositories/task.repository";
import { ProjectRepository } from "src/projects/domain/repositories/project.repository";
import { Task } from "../../domain/entities/task.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { TaskCreatedEvent } from "../../domain/events/task-created.event";



@Injectable()
export class CreateTaskUseCase {
    constructor(private readonly taskRepository:TaskRepository,
        private readonly projectRepository:ProjectRepository,
        private readonly eventEmitter:EventEmitter2,
    ){}

    async execute(titre:string,projectId:number):Promise<Task>{
       

        const existingProject = await this.projectRepository.findById(projectId);

        if(!existingProject){
            throw new Error("project innexistant")
        }
         const task = new Task(
            null,
            titre,
            false,
            projectId,
            
        )
        const createdTask = await this.taskRepository.create(task);
        this.eventEmitter.emit('task-created',new TaskCreatedEvent(createdTask,existingProject.ownerId));
        return createdTask;
    }
}