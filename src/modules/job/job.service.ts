import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { In, Repository } from 'typeorm';
import { JobDTO } from './jobDTOs/job.dto';
import { CreateJobDTO } from './jobDTOs/createJob.dto';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(Job)
        private readonly jobRepository: Repository<Job>
    ) { }

    async findAll(): Promise<JobDTO[]> {
        const jobs = await this.jobRepository.find();
        return jobs.map(job => JobDTO.fromEntity(job));
    }

    async create(job: CreateJobDTO): Promise<JobDTO> {
        const jobExists = await this.jobRepository.findOne({
            where: {
                name: job.name
            }
        });

        if (jobExists) {
            throw new HttpException('El cargo ya existe', HttpStatus.BAD_REQUEST);
        }
        const newJob = await this.jobRepository.save(job);
        return JobDTO.fromEntity(newJob);
    }

    async findById(id: number): Promise<JobDTO> {
        const job = await this.jobRepository.findOne({
            where: {
                id: id
            }
        });
        if (!job) {
            throw new HttpException('No se encontro el cargo', HttpStatus.NOT_FOUND);
        }
        return JobDTO.fromEntity(job);
    }
}
