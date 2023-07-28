import { IsEnum, IsInt, IsNotEmpty, Matches, Validate, validateSync, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DAY } from "src/entities/detailSchedule.entity";


@ValidatorConstraint({ name: "isEndHourAfterStartHour", async: false })
export class IsEndHourAfterStartHour implements ValidatorConstraintInterface {
    validate(endHour: string, validationArguments: ValidationArguments) {
        const detailSchedule = validationArguments.object as DetailScheduleDTO;
        const startTime = new Date(`2000-01-01T${detailSchedule.startHour}`);
        const endTime = new Date(`2000-01-01T${endHour}`);

        return endTime > startTime;
    }

    defaultMessage() {
        return "La hora de fin debe ser mayor a la hora de inicio";
    }
}

export class DetailScheduleDTO {

    @IsInt()
    id: number;

    @IsNotEmpty({ message: 'El dia es requerido' })
    @IsEnum(DAY, { message: 'El dia no es valido' })
    day: DAY;

    @IsNotEmpty({ message: 'La hora de inicio es requerida' })
    @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'La hora de inicio no es valida' })
    startHour: string;

    @IsNotEmpty({ message: 'La hora de fin es requerida' })
    @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'La hora de fin no es valida' })
    @Validate(IsEndHourAfterStartHour)
    endHour: string;

    static fromEntity(detailSchedule: DetailScheduleDTO): DetailScheduleDTO {
        const dto = new DetailScheduleDTO();
        dto.id = detailSchedule.id;
        dto.day = detailSchedule.day;
        dto.startHour = detailSchedule.startHour;
        dto.endHour = detailSchedule.endHour;
        return dto;
    }
}