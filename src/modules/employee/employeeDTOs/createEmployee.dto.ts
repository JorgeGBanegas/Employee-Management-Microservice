import { IsInt, IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { EmployeeBaseDTO } from "./employeeBase.dto";
import { Employee } from "src/entities/employee.entity";

export class CreateEmployeeDTO extends EmployeeBaseDTO {

    @IsOptional()
    photo: string;

    @IsNotEmpty({ message: 'El id del trabajo es requerido' })
    @IsInt({ message: 'El id del trabajo debe ser un numero entero' })
    job_id: number;

    @IsNotEmpty({ message: 'El id del horario es requerido' })
    @IsInt({ message: 'El id del horario debe ser un numero entero' })
    schedule_id: number;

    static fromEntity(entity: Employee): CreateEmployeeDTO {
        const dto = new CreateEmployeeDTO();
        dto.firstName = entity.firstName;
        dto.lastName = entity.lastName;
        dto.phoneNumber = entity.phoneNumber;
        dto.email = entity.email;
        dto.gender = entity.gender;
        dto.birthDate = entity.birthDate;
        dto.photo = entity.photo;
        dto.job_id = entity.job.id;
        dto.schedule_id = entity.schedule.id;
        return dto;
    }
}