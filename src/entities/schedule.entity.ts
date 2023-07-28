import { ISchedule } from "src/interfaces/schedule.interface";
import { BaseEntiy } from "./base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Employee } from "./employee.entity";
import { DetailSchedule } from "./detailSchedule.entity";
import { join } from "path";

export enum TYPE_OF_SCHEDULE {
    CUSTOM = 'Personalizado',
    DEFAULT = 'Predefinido',
}

@Entity({ name: 'schedule' })
export class Schedule extends BaseEntiy implements ISchedule {
    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'enum', enum: TYPE_OF_SCHEDULE, nullable: false })
    typeOfSchedule: TYPE_OF_SCHEDULE;

    @OneToMany(() => Employee, (employee) => employee.schedule)
    employees: Employee[];

    @OneToMany(() => DetailSchedule, (detailSchedule) => detailSchedule.schedule, { cascade: true, eager: true })
    detailSchedules: DetailSchedule[];
}