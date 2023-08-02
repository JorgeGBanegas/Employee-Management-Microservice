import { GENDER } from "src/entities/employee.entity";
import { IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsPhoneNumber, IsString, MinLength, Validate, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "isOlderThan18", async: false })
export class IsOlderThan18 implements ValidatorConstraintInterface {
    validate(birthDate: Date) {
        const today = new Date();
        const birthDate18 = new Date(birthDate);
        birthDate18.setFullYear(birthDate18.getFullYear() + 18);

        return birthDate18 <= today;
    }

    defaultMessage() {
        return "El empleado debe ser mayor de edad";
    }
}

export class UpdateEmployeeDTO {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser un string' })
    photo: string;

    @IsOptional()
    @IsInt({ message: 'El id del trabajo debe ser un numero entero' })
    job_id: number;

    @IsOptional()
    @IsInt({ message: 'El id del horario debe ser un numero entero' })
    schedule_id: number;

    @IsOptional()
    @IsString({ message: 'El nombre debe ser un string' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    firstName: string;

    @IsOptional()
    @IsString({ message: 'El apellido debe ser un string' })
    @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    lastName: string;

    @IsOptional()
    @IsPhoneNumber('BO', { message: 'El numero de telefono debe ser valido' })
    phoneNumber: string;

    @IsOptional()
    @IsEnum(GENDER, { message: 'El genero debe ser M o F' })
    gender: GENDER;

    @IsOptional()
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha valida' })
    @Validate(IsOlderThan18)
    birthDate: Date;

}
