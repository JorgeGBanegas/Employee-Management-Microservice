import { IJob } from "./job.interface";

export interface IEmployee {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    birthDate: Date;
    job: IJob;
}