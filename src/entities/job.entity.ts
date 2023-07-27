import { BaseEntiy } from "../entities/base.entity";
import { IJob } from "../interfaces/job.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { Employee } from "./employee.entity";

@Entity({name: 'job'})
export class Job extends BaseEntiy implements IJob {
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @OneToMany(() => Employee, (employee) => employee.job)
    employees: Employee[];
}