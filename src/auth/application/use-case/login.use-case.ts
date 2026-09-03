import {Injectable,UnauthorizedException} from '@nestjs/common';
import {UserRepository} from '../../../users/domain/repositories/user.repository';
import {User} from '../../../users/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase{
    constructor(private readonly userRepository: UserRepository, 
        private readonly jwtService: JwtService,
    ){}

    async execute(email: string , password: string) {
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new UnauthorizedException('email incorrect');
        }

        const passwordValid = await bcrypt.compare(password,user.password);
        if(!passwordValid){
            throw new UnauthorizedException('password incorrect');
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            roleId: user.roleId,
        }) 
        return { user, accessToken };
    }
}