import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AttendanceRecordService } from './attendance-record.service';
import { RegisterAssistDto } from './attendance-recordDtos/registerAssist.dto';

@Controller('v1/attendance-record')
export class AttendanceRecordController {
    constructor(
        private readonly attendanceRecordService: AttendanceRecordService,
    ) { }

    @Post()
    async registerAssistance(@Body() attendanceRecord: RegisterAssistDto): Promise<any> {
        try {
            const result = await this.attendanceRecordService.registerAssistance(attendanceRecord);
            return result;
        } catch (error) {
            console.log("🚀 ~ file: attendance-record.controller.ts:17 ~ AttendanceRecordController ~ registerAssistance ~ error:", error)
            throw error;
        }
    }

    @Get('/history')
    async getAttendanceHistory(@Query('email') email: string, 
        @Query('year') year: number, @Query('month') month: number): Promise<any> {
        return await this.attendanceRecordService.getAttendanceHistory(email, year, month);
    }
}
