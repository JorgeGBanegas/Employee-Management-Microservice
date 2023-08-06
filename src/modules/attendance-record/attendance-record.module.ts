import { Module } from '@nestjs/common';
import { AttendanceRecordService } from './attendance-record.service';
import { AttendanceRecordController } from './attendance-record.controller';
import { AttendanceRecord } from 'src/entities/attendanceRecord.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttendanceRecord]),
    TypeOrmModule.forFeature([Employee])
  ],
  providers: [AttendanceRecordService],
  controllers: [AttendanceRecordController]
})
export class AttendanceRecordModule { }
