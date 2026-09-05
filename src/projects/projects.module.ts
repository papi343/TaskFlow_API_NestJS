import { Get, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaProjectRepository } from './infrastructure/repositories/prisma-project.repository';
import { ProjectRepository } from './domain/repositories/project.repository';
import { CreateProjectUseCase } from './application/use-cases/create-project.use-case';
import { ProjectController } from './presentation/http/projects.controller';
import { GetMyProjectsUseCase } from './application/use-cases/get-my-projects.use-case';
import { GetProjectUseCase } from './application/use-cases/get-project.use-case';
import { UpdateProjectUseCase } from './application/use-cases/update-project.use-case';
import { ProjectMembersModule } from './project-members/project-members.module';

@Module({
    imports:[PrismaModule, ProjectMembersModule],
    controllers:[ProjectController],
    providers:[
        CreateProjectUseCase,
        PrismaProjectRepository,
        GetMyProjectsUseCase,
        GetProjectUseCase,
        UpdateProjectUseCase,
        {
            provide:ProjectRepository,
            useExisting:PrismaProjectRepository,
        },
    ],
    exports:[ProjectRepository,],
})
export class ProjectsModule {}
