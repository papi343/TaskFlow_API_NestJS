import { Controller,Body,Post,Get,Param,UseGuards } from '@nestjs/common';
import { CreateProjectMemberUseCase } from '../../application/use-cases/create-project-member.use-case';
import { GetProjectMembersUseCase } from '../../application/use-cases/get-project-members.use-case';
import { AddProjectMemberDto } from './dto/add-project-member.dto';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';

@Controller('projects/:projectId/members')
@UseGuards(JwtAuthGuard)


export class ProjectMembersController {

    constructor(private readonly createProjectMemberUseCase: CreateProjectMemberUseCase,
        private readonly getProjectMembersUseCase: GetProjectMembersUseCase
    ){}


    @Post()
    async addMember(@Param('projectId')projectId:string
     ,@Body() dto:AddProjectMemberDto){
        return this.createProjectMemberUseCase.execute(
        Number(projectId),
            dto.userId,
        )
     }


     @Get()

     async getMembers(@Param('porojectId') projectId:string){
        return this.getProjectMembersUseCase.execute(Number(projectId))
     }
}
