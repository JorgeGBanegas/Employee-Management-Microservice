import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Job } from "src/entities/job.entity";

export class JobDTO {
    @IsNotEmpty({message: 'El id es requerido'})
    @IsInt({message: 'El id debe ser un número'})
    id: number;

    @IsNotEmpty({message: 'El nombre es requerido'})
    @IsString({message: 'El nombre debe ser un string'})
    name: string

    static fromEntity(entity: Job): JobDTO {
        const dto = new JobDTO();
        dto.id = entity.id;
        dto.name = entity.name;
        return dto;
    }
}