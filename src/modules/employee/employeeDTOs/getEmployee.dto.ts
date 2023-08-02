import { IsNotEmpty, IsString } from "class-validator";
import { EmployeeDTO } from "./employee.dto";
import { JobDTO } from "src/modules/job/jobDTOs/job.dto";
import { ScheduleDTO } from "src/modules/schedule/scheduleDTOs/schedule.dto";
import { Employee } from "src/entities/employee.entity";


export class GetEmployeeDTO extends EmployeeDTO {
    @IsNotEmpty()
    job: JobDTO;

    @IsNotEmpty()
    schedule: ScheduleDTO;

    static fromEntity(entity: Employee): GetEmployeeDTO {
        const dto = new GetEmployeeDTO();
        dto.id = entity.id;
        dto.firstName = entity.firstName;
        dto.lastName = entity.lastName;
        dto.phoneNumber = entity.phoneNumber;
        dto.email = entity.email;
        dto.gender = entity.gender;
        dto.birthDate = entity.birthDate;
        dto.photo = entity.photo;
        dto.job = JobDTO.fromEntity(entity.job);
        dto.schedule = ScheduleDTO.fromEntity(entity.schedule);
        return dto;
    }
}