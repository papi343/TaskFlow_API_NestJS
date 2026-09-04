import { Patch, UseGuards } from "@nestjs/common";
import { Body, Controller, Post, Req,Get } from "@nestjs/common";
import { CreateProjectUseCase } from "../../application/use-cases/create-project.use-case";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetMyProjectsUseCase } from "../../application/use-cases/get-my-projects.use-case";
import { GetProjectUseCase } from "src/projects/application/use-cases/get-project.use-case";
import { Param } from "@nestjs/common";
import { UpdateProjectUseCase } from "src/projects/application/use-cases/update-project.use-case";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Controller('projects')

export class ProjectController {
    constructor(private readonly createProjectUseCase: CreateProjectUseCase,
        private readonly getMyProjectsUseCase: GetMyProjectsUseCase,
        private readonly getProjectUseCase: GetProjectUseCase,
        private readonly updateProjectUseCase: UpdateProjectUseCase,
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createProject(@Body( ) dto:CreateProjectDto, @Req() req:any){
        return this.createProjectUseCase.execute(dto.nom, req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getMyProjects(@Req() req:any){
        return this.getMyProjectsUseCase.execute(req.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getProjectById(@Param('id') id:number){
        return this.getProjectUseCase.execute(Number(id));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateProject(@Param('id') id:number,@Body() dto:UpdateProjectDto){
        return this.updateProjectUseCase.execute(Number(id),dto.nom);
    }
}