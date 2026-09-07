import { Controller, Post, UseGuards,Body,Param,Get, Patch } from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddTaskDto } from './dto/add-task.dto';
import { GetTaskUseCase } from '../../application/use-cases/get-task.use-case';
import { GetProjectTaskUseCase } from '../../application/use-cases/get-project-task.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('projects/:projectId/tasks')
@UseGuards(JwtAuthGuard)
export class TaskControllerController {
  constructor(private readonly createTaskUseCase:CreateTaskUseCase,
    private readonly getTaskUseCase:GetTaskUseCase,
    private readonly getProjectTastUseCase:GetProjectTaskUseCase,
    private readonly updteTaskUseCase:UpdateTaskUseCase
   ){}


  @Post()
  async addTask(@Body() dto:AddTaskDto,@Param('projectId') projectId:string){
    const createdTask = await this.createTaskUseCase.execute(dto.titre,Number(projectId));
    return createdTask;
  }
 
  @Get(':id')
  async getTask(@Param('id') taskId:string){
    return this.getTaskUseCase.execute(Number(taskId));
  }

  @Get()
  async getTaskByProjectId(@Param('projectId') projectId:string){
    return this.getProjectTastUseCase.execute(Number(projectId));
  }

  @Patch(':id')
  async updateTask(@Param('id') taskId:string,@Body() dto:UpdateTaskDto){
    return this.updteTaskUseCase.execute(Number(taskId),dto.complete);
  }


}
