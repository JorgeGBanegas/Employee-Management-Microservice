import { IEmployee } from "./employee.interface";

export interface IAttendanceRecord {
    employee: IEmployee;
    date: Date;
    check: string;
    recordType: string;
}