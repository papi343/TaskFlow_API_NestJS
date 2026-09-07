import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../../domain/repositories/task.repository";
import {Task} from "../../domain/entities/task.entity"
import { error } from "console";




@Injectable()
export class UpdateTaskUseCase {
    constructor(private readonly taskRepository:TaskRepository){}



    async execute(taskId:number,completed:Boolean):Promise<Task>{
        const task = await this.taskRepository.findById(taskId);
        if(!task){
            throw new Error(" tache inexistante")
        }
        task.complete = completed;
        const updatedTask = await this.taskRepository.update(task);
        return updatedTask;
    }
}