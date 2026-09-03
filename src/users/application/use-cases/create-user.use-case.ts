import {Injectable} from '@nestjs/common';
import {User} from '../../domain/entities/user.entity';
import {UserRepository} from'../../domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CreateUserUseCase{
    constructor(private readonly userRepository: UserRepository){}

    async execute(user:User):Promise<User>{
        // console.log('PASSWORD AVANT :', user.password);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        // console.log('PASSWORD HASHÉ :', hashedPassword);
        const createdUser = await this.userRepository.create({...user, password: hashedPassword}
        );

    
        return createdUser;
    }
}
