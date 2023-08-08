import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { AttendanceRecord } from 'src/entities/attendanceRecord.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([Job]),
    TypeOrmModule.forFeature([Schedule]),
    TypeOrmModule.forFeature([AttendanceRecord]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule { }
