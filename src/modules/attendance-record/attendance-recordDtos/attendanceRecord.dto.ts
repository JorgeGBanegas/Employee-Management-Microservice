import { IsDate, IsEnum, IsNotEmpty, Matches } from "class-validator";
import { AttendanceRecord, RECORD_TYPE } from "src/entities/attendanceRecord.entity";

export class AttendanceRecordDTO {
    @IsNotEmpty({ message: 'La fecha es requerida' })
    @IsDate({ message: 'La fecha no es valida' })
    date: Date;
    
    @IsNotEmpty({ message: 'La hora de fin es requerida' })
    @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'La hora de fin no es valida' })
    check: string;
    
    @IsNotEmpty({ message: 'El tipo de registro es requerido' })
    @IsEnum(RECORD_TYPE, { message: 'El tipo de registro no es valido' })
    recordType: RECORD_TYPE;

    static fromEntity(attendanceRecord: AttendanceRecord): AttendanceRecordDTO {
        const dto = new AttendanceRecordDTO();
        dto.date = attendanceRecord.date;
        dto.check = attendanceRecord.check;
        dto.recordType = attendanceRecord.recordType;
        return dto;     
    }
}