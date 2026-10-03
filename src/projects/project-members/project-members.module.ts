import { Module } from '@nestjs/common';
import { CreateProjectMemberUseCase } from './application/use-cases/create-project-member.use-case';
import { PrismaProjectMemberRepository } from './infrastructure/repositories/prisma-project-member.repository';
import { GetProjectMembersUseCase } from './application/use-cases/get-project-members.use-case';
import { ProjectMembersRepository } from './domain/repositories/project-members.repository';
import { ProjectMembersController } from './presentation/http/project-members.controller';

@Module({
    controllers:[ProjectMembersController,],
    providers: [
        GetProjectMembersUseCase,
        CreateProjectMemberUseCase,
        PrismaProjectMemberRepository,
        {
            provide: ProjectMembersRepository,
            useExisting: PrismaProjectMemberRepository,
        },
    ],
    exports: [ProjectMembersRepository,]
})
export class ProjectMembersModule {}
