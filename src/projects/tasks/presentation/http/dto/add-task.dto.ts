import { IsNotEmpty, IsString } from "class-validator";





export class AddTaskDto{
    @IsString()
    @IsNotEmpty()
    titre!:string
}