import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleDTO } from './scheduleDTOs/schedule.dto';
import { CreateScheduleDTO } from './scheduleDTOs/createSchedule.dto';
import { GetScheduleDTO } from './scheduleDTOs/getSchedule.dto';

@Controller('v1/schedule')
export class ScheduleController {

    constructor(
        private readonly scheduleService: ScheduleService
    ) { }

    @Get()
    async findAll(): Promise<ScheduleDTO[]> {
        return await this.scheduleService.findAll();
    }

    @Post()
    async create(@Body() schedule: CreateScheduleDTO): Promise<ScheduleDTO> {
        return await this.scheduleService.create(schedule);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<GetScheduleDTO> {
        if (isNaN(Number(id))) {
            throw new HttpException('Id debe ser un numero', HttpStatus.BAD_REQUEST);
        }
        return await this.scheduleService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        if (isNaN(Number(id))) {
            throw new HttpException('Id debe ser un numero', HttpStatus.BAD_REQUEST);
        }
        return await this.scheduleService.remove(id);
    }
}
