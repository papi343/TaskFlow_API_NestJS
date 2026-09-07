import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { GetProjectTaskUseCase } from './application/use-cases/get-project-task.use-case';
import { GetTaskUseCase } from './application/use-cases/get-task.use-case';
import { PrismaTaskRepository } from './infrastructure/repositories/prisma-task.repository';
import { TaskRepository } from './domain/repositories/task.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskControllerController } from './presentation/http/task-controller.controller';

@Module({
    
    imports:[PrismaModule],
    providers:[
        CreateTaskUseCase,
        GetProjectTaskUseCase,
        GetTaskUseCase,
        PrismaTaskRepository,
        {
            provide:TaskRepository,
            useExisting:PrismaTaskRepository,
        }
    ],
    exports:[TaskRepository,],
    controllers: [TaskControllerController],
})
export class TasksModule {}
