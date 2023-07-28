import { ScheduleDTO } from "./schedule.dto";
import { Schedule } from "src/entities/schedule.entity";
import { DetailScheduleDTO } from "./detailSchedule.dto";
import { IsArray } from "class-validator";

export class GetScheduleDTO extends ScheduleDTO {

    @IsArray()
    detailSchedules: DetailScheduleDTO[]

    static formEntity(entity: Schedule): GetScheduleDTO {
        const dto = new GetScheduleDTO();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.typeOfSchedule = entity.typeOfSchedule;
        dto.detailSchedules = entity.detailSchedules.map(detailSchedule => DetailScheduleDTO.fromEntity(detailSchedule));
        return dto;
    }
}