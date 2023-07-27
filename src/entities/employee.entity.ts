import { IEmployee } from "src/interfaces/employee.interface";
import { BaseEntiy } from "./base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique } from "typeorm";
import { Job } from "./job.entity";
import { Schedule } from "./schedule.entity";
import { AttendanceRecord } from "./attendanceRecord.entity";

enum GENDER {
    MALE = 'M',
    FEMALE = 'F',
}


@Entity({name: 'employee'})
export class Employee extends BaseEntiy implements IEmployee{
    @Column({ type: 'varchar', length: 60, nullable: false})
    firstName: string;
    
    @Column({ type: 'varchar', length: 60, nullable: false})
    lastName: string;

    @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: 'enum', enum: GENDER, nullable: false})
    gender: GENDER;

    @Column({ type: 'date', nullable: false })
    birthDate: Date;

    @Column({ type: 'text', nullable: false })
    photo: string;

    @ManyToOne(() => Job, (job) => job.employees, {nullable: false})
    job: Job;

    @ManyToOne(() => Schedule, (schedule) => schedule.employees, {nullable: false})
    schedule: Schedule;

    @OneToMany(() => AttendanceRecord, (attendanceRecord) => attendanceRecord.employee, {nullable: false})
    attendanceRecords: AttendanceRecord[];
}