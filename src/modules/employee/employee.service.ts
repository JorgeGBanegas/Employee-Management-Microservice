import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeDTO } from './employeeDTOs/employee.dto';
import { GetEmployeeDTO } from './employeeDTOs/getEmployee.dto';
import { CreateEmployeeDTO } from './employeeDTOs/createEmployee.dto';
import { ConfigService } from '@nestjs/config';
import { Job } from 'src/entities/job.entity';
import { JobService } from '../job/job.service';
import { ScheduleService } from '../schedule/schedule.service';
import { Schedule } from 'src/entities/schedule.entity';
import { UpdateEmployeeDTO } from './employeeDTOs/updateEmployee.dto';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        @InjectRepository(Job)
        private readonly jobRepository: Repository<Job>,
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>,
        private readonly configService: ConfigService,
    ) { }

    async findAll(): Promise<EmployeeDTO[]> {
        const employees = await this.employeeRepository.find();
        return employees.map((employee) => EmployeeDTO.fromEntity(employee));
    }

    async findById(id: number): Promise<GetEmployeeDTO> {
        const employee = await this.employeeRepository.findOne({
            where: { id },
        });

        if (!employee) {
            throw new HttpException('El empleado no existe', HttpStatus.NOT_FOUND);
        }

        return GetEmployeeDTO.fromEntity(employee);
    }

    async create(employeeDTO: CreateEmployeeDTO, photo: Express.Multer.File): Promise<EmployeeDTO> {

        await this.verifyData(employeeDTO);
        const user = await this.registerUserEmployee(photo, employeeDTO);

        const newEmployee = this.employeeRepository.create({
            firstName: employeeDTO.firstName,
            lastName: employeeDTO.lastName,
            email: employeeDTO.email,
            phoneNumber: employeeDTO.phoneNumber,
            photo: user.image,
            gender: employeeDTO.gender,
            birthDate: employeeDTO.birthDate,
            job: { id: employeeDTO.job_id },
            schedule: { id: employeeDTO.schedule_id },
        });

        const newEmployeeSaved = await this.employeeRepository.save(newEmployee);
        return EmployeeDTO.fromEntity(newEmployeeSaved);
    }

    async update(id: number, employeeDTO: UpdateEmployeeDTO, photo: Express.Multer.File): Promise<EmployeeDTO> {

        let employee = await this.verifyUpdate(id, employeeDTO);

        if (photo) {
            await this.updatePhoto(photo, employee.email);
        }


        const employeeUpdated = Object.assign(employee, employeeDTO);
        const employeeSaved = await this.employeeRepository.save(employeeUpdated);
        return EmployeeDTO.fromEntity(employeeSaved);
    }

    private async verifyUpdate(id: number, employeeDTO: UpdateEmployeeDTO): Promise<any> {
        const employee = await this.employeeRepository.findOne({
            where: { id },
        });
        if (!employee) {
            throw new HttpException('El empleado no existe', HttpStatus.NOT_FOUND);
        }

        if (employeeDTO.job_id) {
            const job = await this.jobRepository.findOne({
                where: { id: employeeDTO.job_id },
            });

            if (!job) {
                throw new HttpException('El puesto no existe', HttpStatus.NOT_FOUND);
            }
        }

        if (employeeDTO.schedule_id) {
            const schedule = await this.scheduleRepository.findOne({
                where: { id: employeeDTO.schedule_id },
            });

            if (!schedule) {
                throw new HttpException('El horario no existe', HttpStatus.NOT_FOUND);
            }
        }
        return employee;
    }

    private async verifyData(employeeDTO: CreateEmployeeDTO): Promise<void> {
        const userExist = await this.employeeRepository.findOne({
            where: [
                { email: employeeDTO.email },
                { phoneNumber: employeeDTO.phoneNumber },
            ],
        });
        if (userExist) {
            throw new HttpException('El email o telefono ya han sido registrados', HttpStatus.CONFLICT);
        }

        const job = await this.jobRepository.findOne({
            where: { id: employeeDTO.job_id },
        });

        if (!job) {
            throw new HttpException('El puesto no existe', HttpStatus.NOT_FOUND);
        }

        const schedule = await this.scheduleRepository.findOne({
            where: { id: employeeDTO.schedule_id },
        });

        if (!schedule) {
            throw new HttpException('El horario no existe', HttpStatus.NOT_FOUND);
        }
    }

    private async registerUserEmployee(photo: Express.Multer.File, employeeDTO: CreateEmployeeDTO): Promise<any> {
        try {
            const base64Photo = photo.buffer.toString('base64');
            const urlReq = this.configService.get('AUTH_API_URL') + '/auth/signup';
            const role = this.configService.get('ROLE_EMPLOYEE');
            const request = {
                'email': employeeDTO.email,
                'first_name': employeeDTO.firstName,
                'last_name': employeeDTO.lastName,
                'image': base64Photo,
                'role': role,
            };

            const response = await fetch(urlReq, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new HttpException('Error al registrar el empleado', HttpStatus.BAD_REQUEST);
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    }

    private async updatePhoto(photo: Express.Multer.File, email: string): Promise<any> {
        try {
            const base64Photo = photo.buffer.toString('base64');
            const urlReq = this.configService.get('AUTH_API_URL') + '/auth/user/image';
            const request = {
                'email': email,
                'image': base64Photo,
            };

            const response = await fetch(urlReq, {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new HttpException('Error al actualizar la foto del empleado', HttpStatus.BAD_REQUEST);
            }
            return response.json();
        } catch (error) {
            throw error;
        }
    }
}
