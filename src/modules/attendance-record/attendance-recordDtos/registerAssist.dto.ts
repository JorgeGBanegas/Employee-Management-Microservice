import { ArrayMaxSize, ArrayMinSize, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, Matches } from "class-validator";
import { RECORD_TYPE } from "src/entities/attendanceRecord.entity";

export class RegisterAssistDto {

    @IsNotEmpty({ message: 'El email del empleado es requerido' })
    @IsEmail({}, { message: 'El email del empleado no es válido' })
    employeeEmail: string;

    @IsNotEmpty({ message: 'La imagen de referencia es requerida' })
    referenceImage: string;

    @IsNotEmpty({ message: 'La imagen a comparar es requerida' })
    compareImage: string;

    @IsNotEmpty({ message: 'El tipo de registro es requerido' })
    @IsEnum(RECORD_TYPE, { message: 'El tipo de registro no es válido' })
    recordType: RECORD_TYPE;

    @ArrayMinSize(2, { message: 'Debe haber al menos 2 elementos en el array' })
    @ArrayMaxSize(2, { message: 'El array no puede contener más de 2 elementos' })
    @IsNumber({}, { each: true, message: 'Los elementos del array deben ser números' })
    location: number[];
}