import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDTO } from './employeeDTOs/employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEmployeeDTO } from './employeeDTOs/createEmployee.dto';
import { IsNotEmpty } from 'class-validator';
import { Response } from 'express';
import { UpdateEmployeeDTO } from './employeeDTOs/updateEmployee.dto';
import { GetEmployeeDTO } from './employeeDTOs/getEmployee.dto';

@Controller('v1/employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) { }

    @Get()
    async findAll(): Promise<EmployeeDTO[]> {
        return await this.employeeService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<GetEmployeeDTO> {
        if (isNaN(Number(id))) {
            throw new HttpException('Id debe ser un numero', HttpStatus.BAD_REQUEST);
        }

        return await this.employeeService.findById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
    async create(@UploadedFile() photo: Express.Multer.File,
        @Body() employee: CreateEmployeeDTO): Promise<any> {

        if (!photo) {
            throw new HttpException('Debe subir una foto', HttpStatus.BAD_REQUEST);
        }

        return await this.employeeService.create(employee, photo);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('photo'))
    async update(@Param('id') id: number,
        @UploadedFile() photo: Express.Multer.File,
        @Body() employee: UpdateEmployeeDTO): Promise<any> {

        if (isNaN(Number(id))) {
            throw new HttpException('Id debe ser un numero', HttpStatus.BAD_REQUEST);
        }

        return await this.employeeService.update(id, employee, photo);
    }

    @Get('schedule/assistance/:email')
    async getScheduleAndAssistance(@Param('email') email: string): Promise<any> {
        return await this.employeeService.getCurrentScheduleAndAssistance(email);
    }

    @Get('schedule/:id')
    async getSchedule(@Param('id') id: number): Promise<any> {
        if (isNaN(Number(id))) {
            throw new HttpException('Id debe ser un numero', HttpStatus.BAD_REQUEST);
        }
        return await this.employeeService.getSchedule(id);
    }
}
