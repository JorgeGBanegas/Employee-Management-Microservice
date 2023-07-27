import { IDetailSchedule } from "src/interfaces/detailSchedule.interface";
import { BaseEntiy } from "./base.entity";
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from "typeorm";
import { Schedule } from "./schedule.entity";

enum DAY {
    MONDAY = 'Lunes',
    TUESDAY = 'Martes',
    WEDNESDAY = 'Miercoles',
    THURSDAY = 'Jueves',
    FRIDAY = 'Viernes',
    SATURDAY = 'Sabado',
    SUNDAY = 'Domingo',
}

@Entity({name: 'detailSchedule'})
@Index(['id', 'schedule'], { unique: true })
export class DetailSchedule extends BaseEntiy implements IDetailSchedule {
    
    @Column({ type: 'enum', enum: DAY, nullable: false})
    day: DAY;
    
    @Column({type: 'time', nullable: false})
    startHour: string;

    @Column({type: 'time', nullable: false})
    endHour: string;

    @PrimaryColumn({ type: 'number', name: 'schedule_id', nullable: false })
    @ManyToOne(() => Schedule, (schedule) => schedule.detailSchedules, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    schedule: Schedule;
}