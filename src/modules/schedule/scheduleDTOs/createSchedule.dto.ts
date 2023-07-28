import { TYPE_OF_SCHEDULE } from "src/entities/schedule.entity"
import { DetailScheduleDTO } from "./detailSchedule.dto"
import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreateDetailScheduleDTO } from "./createDetailSchedule.dto"

export class CreateScheduleDTO {

    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser un texto' })
    name: string

    @IsNotEmpty({ message: 'El tipo de horario es requerido' })
    @IsEnum(TYPE_OF_SCHEDULE, { message: 'El tipo de horario no es valido' })
    typeOfSchedule: TYPE_OF_SCHEDULE

    @IsNotEmpty({ message: 'Los detalles son requeridos' })
    @IsArray({ message: 'Los detalles deben ser un arreglo' })
    @ValidateNested({ each: true })
    @Type(() => CreateDetailScheduleDTO)
    detailSchedules: CreateDetailScheduleDTO[]
}