import { Controller ,Post,Get,Req,UseGuards} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { User } from '../../domain/entities/user.entity';
import { Body } from '@nestjs/common';
import { CreateUserDto } from '../../presentation/http/dto/create_user_dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly createUserUseCase:CreateUserUseCase,){

    } 

    @Post()
    async createUser(@Body() dto:CreateUserDto){
        const user = new User(
            null,
            dto.nom,
            dto.prenom,
            dto.email,
            dto.password,
            dto.roleId,

        )

        const response =  this.createUserUseCase.execute(user);
        return response;
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Req() req: any) {
        return req.user;
    }

}
