import { IEmployee } from "./employee.interface";

export interface IAttendanceRecord {
    employee: IEmployee;
    date: Date;
    checkIn: string;
    checkOut: string;
    recordType: string;
}