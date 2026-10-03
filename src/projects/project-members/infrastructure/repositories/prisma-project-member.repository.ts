import { ProjectMember } from "../../domain/entities/project-member.entity";
import { ProjectMembersRepository } from "../../domain/repositories/project-members.repository";
import { PrismaService } from "../../../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class PrismaProjectMemberRepository extends ProjectMembersRepository {

    constructor (private readonly prisma: PrismaService,){
        super();
    }

    async create(projectMember: ProjectMember): Promise<ProjectMember> {

        const existingProjectMember = await this.prisma.projectMember.findFirst({
            where:{userId:projectMember.userId,projectId:projectMember.projectId,}
        });

        if(existingProjectMember){
            throw new Error("Membre deja existant pour ce projet");
        } else {

            const createdProjectMember = await this.prisma.projectMember.create({
                data:{
                    role: "MEMBER",
                    projectId:projectMember.projectId,
                    userId:projectMember.userId,
                }
            })
            return new ProjectMember(
                createdProjectMember.id,
                createdProjectMember.projectId,
                createdProjectMember.userId,
                createdProjectMember.createdAt,
               
            )
        }
    }


    async findByProjectId(projectId: number):Promise<ProjectMember[]>{
         const foundProjectMembers = await this.prisma.projectMember.findMany({
            where:{projectId:projectId}
         });
         return foundProjectMembers.map((projectMember) => new ProjectMember(
             projectMember.id,
             projectMember.projectId,
             projectMember.userId,
             projectMember.createdAt,
            
         ))
    }



    async findByProjectIdAndUserId(projectId: number, userId: number): Promise<ProjectMember|null>{
        const foundProjectMember = await this.prisma.projectMember.findFirst({
            where:{projectId:projectId,userId:userId}
        });
        if(foundProjectMember){
            return new ProjectMember(
                foundProjectMember.id,
                foundProjectMember.projectId,
                foundProjectMember.userId,
                foundProjectMember.createdAt,
                
            )
        }
        return null;
    }
}