
import{IsNotEmpty,IsString} from "class-validator";



export class UpdateProjectDto{
    @IsString()
    @IsNotEmpty()
    nom!: string;
}