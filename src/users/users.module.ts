import { Module } from '@nestjs/common';
import { UsersController } from './presentation/http/users.controller';
import {PrismaModule} from '../prisma/prisma.module';
import {PrismaUserRepository} from './infrastructure/repositories/prisma-user.repository';
import {UserRepository} from './domain/repositories/user.repository';
import {CreateUserUseCase} from './application/use-cases/create-user.use-case';


@Module({
  imports:[PrismaModule],
  controllers: [UsersController],
   providers:[
    CreateUserUseCase,
    PrismaUserRepository,
    {
      provide:UserRepository,
      useExisting:PrismaUserRepository,
    },
   ],
   exports:[UserRepository,],
})
export class UsersModule {}
