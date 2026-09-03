import {Injectable} from '@nestjs/common';
import {User} from '../../domain/entities/user.entity';
import {UserRepository} from'../../domain/repositories/user.repository';
import {PrismaService} from '../../../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository extends UserRepository{
  
    constructor(private readonly prisma: PrismaService,){
        super();
    }

    async create(user:User):Promise<User>{
        const createdUser = await this.prisma.user.create({
            data: {
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                password: user.password,
                roleId: user.roleId,
            },
        });

        return new User(
            createdUser.id,
            createdUser.nom,
            createdUser.prenom,
            createdUser.email,
            createdUser.password,
            createdUser.roleId,
        );
    }

    async findByEmail(email:string):Promise<User|null>{
        const foundUser = await this.prisma.user.findUnique({
            where: {
                email:email,
            },
            
        })
        if(!foundUser){
            return null;
        }
        return new User(
            foundUser.id,
            foundUser.nom,
            foundUser.prenom,
            foundUser.email,
            foundUser.password,
            foundUser.roleId,
        );
    }
}