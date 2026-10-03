import { Injectable } from "@nestjs/common";
import { Project } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { PrismaService } from "../../../prisma/prisma.service";




@Injectable()
export class PrismaProjectRepository extends ProjectRepository{

    constructor(private readonly prisma: PrismaService,){ super();}

    async create(project:Project):Promise<Project>{
        const createdProject = await this.prisma.project.create({
            data:{
                nom:project.nom,
                ownerId:project.ownerId,
            }
        });

        return new Project(
            createdProject.id,
            createdProject.nom,
            createdProject.ownerId,
            createdProject.createdAt,
            createdProject.updatedAt,
        );
    }


    async findById(id:number):Promise<Project|null>{
        const foundProject = await this.prisma.project.findUnique({
            where:{id:id}
        });
        if(!foundProject){
            return null;
        }

        return new Project(
            foundProject.id,
            foundProject.nom,
            foundProject.ownerId,
            foundProject.createdAt,
            foundProject.updatedAt,
        );
    }
    
    async findByOwnerId(ownerId:number):Promise<Project[]>{

            const foundProjects = await this.prisma.project.findMany({
                where:{ownerId:ownerId}
            });
            return foundProjects.map((project)=> new Project(
                project.id,
                project.nom,
                project.ownerId,
                project.createdAt,
                project.updatedAt,
            ));
    }

    async update(project:Project):Promise<Project>{
        const updatedProject = await this.prisma.project.update({
            where:{id:project.id!},
            data:{
                nom:project.nom,
            },
        });

        return new Project(
            updatedProject.id,
            updatedProject.nom,
            updatedProject.ownerId,
            updatedProject.createdAt,
            updatedProject.updatedAt,
        );
    }

    async delete(id:number):Promise<void>{}
}