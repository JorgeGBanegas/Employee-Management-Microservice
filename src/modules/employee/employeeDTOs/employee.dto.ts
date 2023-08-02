import { IsInt, IsNotEmpty } from "class-validator";
import { EmployeeBaseDTO } from "./employeeBase.dto";
import { Employee } from "src/entities/employee.entity";

export class EmployeeDTO extends EmployeeBaseDTO {
    @IsNotEmpty()
    @IsInt()
    id: number;

    static fromEntity(entity: Employee): EmployeeDTO {
        const employeeDTO = new EmployeeDTO();
        employeeDTO.id = entity.id;
        employeeDTO.firstName = entity.firstName;
        employeeDTO.lastName = entity.lastName;
        employeeDTO.email = entity.email;
        employeeDTO.phoneNumber = entity.phoneNumber;
        employeeDTO.gender = entity.gender;
        employeeDTO.birthDate = entity.birthDate;
        employeeDTO.photo = entity.photo;
        return employeeDTO;
    }
}