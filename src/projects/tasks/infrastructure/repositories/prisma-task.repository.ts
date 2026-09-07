import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../../domain/repositories/task.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { Task } from "../../domain/entities/task.entity";




@Injectable()

export class PrismaTaskRepository extends TaskRepository{

    constructor(private readonly prisma:PrismaService){super();}

    async create(task:Task):Promise<Task>{

        const createdTask = await this.prisma.task.create({
            data:{
                titre:task.titre,
                complete:task.complete,
                projectId:task.projectId,
            },
        });

        return new Task(
            createdTask.id,
            createdTask.titre,
             createdTask.complete,
            createdTask.projectId
        )
    }


    async findById(taskId: number): Promise<Task | null> {
         const foundTask= await this.prisma.task.findUnique({
            where:{id:taskId},
         });

         if(!foundTask){
             return null;
         }

         return new Task(
            foundTask.id,
            foundTask.titre,
            foundTask.complete,
            foundTask.projectId
         );
    }

    async findByProjectId(projectId: number): Promise<Task[]> {
        const tasksfounded = await this.prisma.task.findMany({
            where:{projectId:projectId},
        });
        return tasksfounded.map((task)=> new Task(
            task.id,
            task.titre,
            task.complete,
            task.projectId,
        ));
    }

    async update(task: Task): Promise<Task> {
        const updatedTask = await this.prisma.task.update({
            where:{id:task.id!},
            data:{
                complete:task.complete!,
            }
        });
        return new Task(
            updatedTask.id,
            updatedTask.titre,
            updatedTask.complete,
            updatedTask.projectId,
        );
    }

    async delete(taskId: number): Promise<void> {
        
    }

}