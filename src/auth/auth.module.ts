import { Module } from '@nestjs/common';
import {LoginUseCase} from './application/use-case/login.use-case';
import {ConfigModule,ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import { StringValue } from 'ms';
import {UsersModule} from '../users/users.module';
import { AuthController } from './presentation/http/auth.controller';

@Module({
    imports:[ UsersModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=>({
                secret:configService.getOrThrow<string>('JWT_SECRET'),
                signOptions:{
                    expiresIn:configService.getOrThrow<StringValue>('JWT_EXPIRE_IN'),
                },
            }),

        }),
    ],
    controllers:[AuthController],
    providers:[LoginUseCase,],
})
export class AuthModule {}
