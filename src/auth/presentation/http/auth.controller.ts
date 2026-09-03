import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-case/login.use-case';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly LoginUseCase: LoginUseCase){}

    @Post('login')
    async Login(@Body() LoginDto: LoginDto){
        return this.LoginUseCase.execute(LoginDto.email, LoginDto.password);
    }
}