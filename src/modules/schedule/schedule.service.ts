import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { Repository } from 'typeorm';
import { ScheduleDTO } from './scheduleDTOs/schedule.dto';
import { CreateScheduleDTO } from './scheduleDTOs/createSchedule.dto';
import { GetScheduleDTO } from './scheduleDTOs/getSchedule.dto';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>
    ) { }

    async findAll(): Promise<ScheduleDTO[]> {

        const schedules = await this.scheduleRepository.find();

        return schedules.map(schedule => ScheduleDTO.fromEntity(schedule));
    }

    async create(schedule: CreateScheduleDTO): Promise<ScheduleDTO> {
        const newSchedule = await this.scheduleRepository.save(schedule);
        return ScheduleDTO.fromEntity(newSchedule);
    }

    async findOne(id: number): Promise<GetScheduleDTO> {
        const schedule = await this.scheduleRepository.findOne({
            where: { id: id },
            relations: ['detailSchedules']
        });

        if (!schedule) {
            throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
        }

        return GetScheduleDTO.formEntity(schedule);
    }

    async remove(id: number): Promise<void> {

        const schedule = await this.scheduleRepository.findOne({
            where: { id: id }
        });

        if (!schedule) {
            throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
        }
        await this.scheduleRepository.softDelete(id);
    }
}
