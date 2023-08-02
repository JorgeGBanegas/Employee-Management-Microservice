import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Employee, GENDER } from "src/entities/employee.entity";

export class EmployeeBaseDTO {

    @IsNotEmpty({ message: 'El nombre del empleado es requerido' })
    @IsString({ message: 'El nombre del empleado debe ser un string' })
    @MinLength(3, { message: 'El nombre del empleado debe tener al menos 3 caracteres' })
    firstName: string;

    @IsNotEmpty({ message: 'El apellido del empleado es requerido' })
    @IsString({ message: 'El apellido del empleado debe ser un string' })
    @MinLength(3, { message: 'El apellido del empleado debe tener al menos 3 caracteres' })
    lastName: string;

    @IsNotEmpty({ message: 'El email del empleado es requerido' })
    @IsEmail({}, { message: 'El email del empleado debe ser un email valido' })
    email: string;

    @IsNotEmpty({ message: 'El numero de telefono del empleado es requerido' })
    @IsString({ message: 'El numero de telefono del empleado debe ser un string' })
    @IsPhoneNumber('BO', { message: 'El numero de telefono del empleado debe ser un numero de telefono valido' })
    phoneNumber: string;

    @IsNotEmpty({ message: 'El genero del empleado es requerido' })
    @IsEnum(GENDER, { 'message': 'El genero debe ser M o F' })
    gender: GENDER;

    @IsNotEmpty({ message: 'La fecha de nacimiento del empleado es requerida' })
    @IsDate({ message: 'La fecha de nacimiento del empleado debe ser una fecha valida' })
    birthDate: Date;

    @IsNotEmpty({ message: 'La foto del empleado es requerida' })
    @IsString({ message: 'La foto del empleado debe ser un string' })
    photo: string;
}