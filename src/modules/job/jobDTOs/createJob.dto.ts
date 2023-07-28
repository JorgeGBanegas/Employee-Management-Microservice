import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateJobDTO {
    
    @IsNotEmpty({message: 'El nombre del cargo es requerido'})
    @IsString({message: 'El nombre del cargo debe ser un string'})
    @MinLength(3, {message: 'El nombre del cargo debe tener al menos 3 caracteres'})
    name: string;
}