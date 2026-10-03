import { IsBoolean, IsNotEmpty } from "class-validator";




export class UpdateTaskDto{
    @IsBoolean()
    @IsNotEmpty()
    complete!:Boolean
}