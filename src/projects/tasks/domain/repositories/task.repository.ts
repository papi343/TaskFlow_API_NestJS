import { Task } from "../entities/task.entity";




export abstract class TaskRepository{
     abstract create(task:Task):Promise<Task>;
     abstract findById(taskId:number):Promise<Task|null>
     abstract findByProjectId(projectId:number):Promise<Task[]>;
     abstract update(task:Task):Promise<Task>;
     abstract delete(taskId:number):Promise<void>;
}