import { IsArray, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Schedule } from "src/entities/schedule.entity";
import { DetailScheduleDTO } from "src/modules/schedule/scheduleDTOs/detailSchedule.dto";

export class EmployeeScheduleDTO {
    @IsNotEmpty({ message: 'El email del empleado es requerido' })
    @IsEmail({}, { message: 'El email no es valido' })
    employeeEmail: string;

    @IsInt({ message: 'El id del Horario debe ser un numero' })
    scheduleId: number;

    @IsNotEmpty({ message: 'El nombre del Horario es requerido' })
    @IsString({ message: 'El nombre del Horario debe ser un string' })
    scheduleName: string;

    @IsArray({ message: 'El detalle del Horario debe ser un array' })    
    detailSchedule: DetailScheduleDTO[];

    static fromEntity(schedule: Schedule, employeeEmail: string): EmployeeScheduleDTO {
        const dto = new EmployeeScheduleDTO();
        dto.employeeEmail = employeeEmail;
        dto.scheduleId = schedule.id;
        dto.scheduleName = schedule.name;
        dto.detailSchedule = schedule.detailSchedules.map(detailSchedule => DetailScheduleDTO.fromEntity(detailSchedule));
        return dto;
    }
}