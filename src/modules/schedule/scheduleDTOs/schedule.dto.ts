import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Schedule, TYPE_OF_SCHEDULE } from "src/entities/schedule.entity";
import { DetailScheduleDTO } from "./detailSchedule.dto";

export class ScheduleDTO {

    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(TYPE_OF_SCHEDULE)
    typeOfSchedule: TYPE_OF_SCHEDULE;



    static fromEntity(entity: Schedule): ScheduleDTO {
        const dto = new ScheduleDTO();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.typeOfSchedule = entity.typeOfSchedule;
        return dto;
    }
}