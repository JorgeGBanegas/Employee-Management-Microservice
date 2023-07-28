import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { JobDTO } from './jobDTOs/job.dto';
import { CreateJobDTO } from './jobDTOs/createJob.dto';

@Controller('v1/job')
export class JobController {
    constructor(
        private readonly jobService: JobService
    ) {}

    @Get()
    async findAll(): Promise<JobDTO[]> {
        return await this.jobService.findAll();
    }

    @Post()
    async create(@Body() job: CreateJobDTO): Promise<CreateJobDTO> {
        try {
            console.log("🚀 ~ file: job.controller.ts:20 ~ JobController ~ create ~ job:", job)
            return await this.jobService.create(job);
        }catch(error) {
            throw error;
        }
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<JobDTO> {
        try {
            console.log("🚀 ~ file: job.controller.ts:30 ~ JobController ~ findById ~ id:", id)
            return await this.jobService.findById(id);
        }catch(error) {
            throw error;
        }
    }
}
