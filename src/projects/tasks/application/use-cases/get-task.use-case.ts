import { TaskRepository } from "../../domain/repositories/task.repository";
import { Task} from "../../domain/entities/task.entity"
import { Injectable } from "@nestjs/common";





@Injectable()
export class GetTaskUseCase{
    constructor(private readonly taskRepository:TaskRepository){

    }


    async execute(taskId:number):Promise<Task|null>
    {
        const foundedTask= await this.taskRepository.findById(taskId);
        return foundedTask;
    }
}