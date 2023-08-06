import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntiy } from "./base.entity";
import { IAttendanceRecord } from "src/interfaces/attendanceRecord.interface";
import { Employee } from "./employee.entity";

export enum RECORD_TYPE {
    CHECK_IN = 'Entrada',
    CHECK_OUT = 'Salida',
}

@Entity({ name: 'attendanceRecord' })
export class AttendanceRecord extends BaseEntiy implements IAttendanceRecord {
    @ManyToOne(() => Employee, (employee) => employee.attendanceRecords)
    employee: Employee;

    @Column({ type: 'date', nullable: false })
    date: Date;

    @Column({ type: 'time', nullable: false })
    check: string;

    @Column({ type: 'enum', enum: RECORD_TYPE, nullable: false })
    recordType: RECORD_TYPE;
}