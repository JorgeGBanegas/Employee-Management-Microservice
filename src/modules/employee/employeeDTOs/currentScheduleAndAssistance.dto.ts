import { IsNotEmpty, IsString } from "class-validator";
import { DetailSchedule } from "src/entities/detailSchedule.entity";
import { AttendanceRecordDTO } from "src/modules/attendance-record/attendance-recordDtos/attendanceRecord.dto";
import { DetailScheduleDTO } from "src/modules/schedule/scheduleDTOs/detailSchedule.dto";

export class CurrentScheduleAndAssistanceDTO{

    @IsNotEmpty({message: 'El nombre del horario es requerido'})
    @IsString({message: 'El nombre del horario debe ser un string'})
    nameSchedule: string;

    currentSchedule: DetailScheduleDTO;

    lastRecord: any;

    static fromEntity(nameSchedule: string, currentSchedule: DetailScheduleDTO, record: any): CurrentScheduleAndAssistanceDTO{
        const dto = new CurrentScheduleAndAssistanceDTO();
        dto.nameSchedule = nameSchedule;
        dto.currentSchedule = DetailScheduleDTO.fromEntity(currentSchedule);
        dto.lastRecord = record ? AttendanceRecordDTO.fromEntity(record) : null;
        return dto;
    }
}