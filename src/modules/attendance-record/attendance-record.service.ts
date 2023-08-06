import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceRecord, RECORD_TYPE } from 'src/entities/attendanceRecord.entity';
import { Employee } from 'src/entities/employee.entity';
import { Repository } from 'typeorm';
import { RegisterAssistDto } from './attendance-recordDtos/registerAssist.dto';
import { ConfigService } from '@nestjs/config';
import { DAY, DetailSchedule } from 'src/entities/detailSchedule.entity';

@Injectable()
export class AttendanceRecordService {
    constructor(
        @InjectRepository(AttendanceRecord)
        private readonly attendanceRecordRepository: Repository<AttendanceRecord>,
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
        private readonly configService: ConfigService,
    ) { }
    getRecordType = (recordType: string): RECORD_TYPE => {
        switch (recordType) {
            case 'Entrada':
                return RECORD_TYPE.CHECK_IN;
            case 'Salida':
                return RECORD_TYPE.CHECK_OUT;
            default:
                throw new Error('Invalid record type');
        }
    };


    getDayOfWeek = (dayNumber: number): DAY => {
        switch (dayNumber) {
            case 1:
                return DAY.MONDAY;
            case 2:
                return DAY.TUESDAY;
            case 3:
                return DAY.WEDNESDAY;
            case 4:
                return DAY.THURSDAY;
            case 5:
                return DAY.FRIDAY;
            case 6:
                return DAY.SATURDAY;
            case 0:
                return DAY.SUNDAY;
            default:
                throw new Error('Invalid day number');
        }
    };


    private async verifyFace(attendanceRecord: RegisterAssistDto) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            const body = {
                'reference_image': attendanceRecord.referenceImage,
                'image_to_compare': attendanceRecord.compareImage,
            };

            const response = await fetch(`${this.configService.get('FACE_API_URL')}/facial_recognition`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (response.status != 200 && data.detail) {
                console.error("🚀 ~ file: attendance-record.service.ts:41 ~ AttendanceRecordService ~ verifyFace ~ data['detail']:", data['detail'])
                throw new HttpException(data.detail.message, response.status);
            }

            if (data.is_valid == false) {
                throw new HttpException(data.result.message, HttpStatus.BAD_REQUEST);
            }

            return data;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyZone(location: number[], email: string) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            const body = {
                'coordinates': location,
                'emailEmployee': email,
            };

            const response = await fetch(`${this.configService.get('GEOFENCING_API_URL')}/geozones/verify`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (response.status != 201) {
                console.error("🚀 ~ file: attendance-record.service.ts:105 ~ AttendanceRecordService ~ verifyFace ~ data['detail']:", data.message)
                throw new HttpException(data.message, response.status);
            }

            return data;
            
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    // Verificar si ya existe un registro de entrada para el día actual y el usuario
    async checkIfEntryExistsToday(date: Date, recordType: string, employeeId: number): Promise<void> {
        const attendanceRecord = await this.attendanceRecordRepository.findOne({
            where: {
                date: date,
                recordType: this.getRecordType(recordType),
                employee: { id: employeeId },
            },
        });
        if (!attendanceRecord) {
            throw new HttpException('No se puede registrar una salida sin haber realizado una entrada previa.', HttpStatus.CONFLICT);
        }
    }

    async checkIfAttendanceRecordExistsToday(date: Date, recordType: string, employeeId: number): Promise<void> {
        const attendanceRecord = await this.attendanceRecordRepository.findOne({
            where: {
                date,
                recordType: this.getRecordType(recordType),
                employee: { id: employeeId },
            },
        });

        if (attendanceRecord) {
            throw new HttpException('Ya existe un registro de asistencia para el dia actual', HttpStatus.CONFLICT);
        }

    }

    async registerAssistance(attendanceRecord: RegisterAssistDto): Promise<any> {
        const userExist = await this.validations(attendanceRecord);
        

        const { currentDaySchedule, now, typeRecord, time } = this.getCurrentDaySchedule(attendanceRecord, userExist);

        if (currentDaySchedule) {
            await this.checkIfAttendanceRecordExistsToday(now, typeRecord, userExist.id);
            const { currentHour, allowedStartTime, allowedEndTime } = this.calculateTimeRanges(currentDaySchedule, now);

            if (currentHour >= allowedStartTime && currentHour <= allowedEndTime) {
                if (typeRecord === 'Salida') {
                    await this.checkIfEntryExistsToday(now, 'Entrada', userExist.id);
                }
                const newAttendanceRecord = this.attendanceRecordRepository.create({
                    date: now,
                    recordType: this.getRecordType(typeRecord),
                    employee: { id: userExist.id },
                    check: time
                });
                return await this.attendanceRecordRepository.save(newAttendanceRecord);
            }
            throw new HttpException('No se puede registrar la asistencia fuera del horario permitido', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('No hay un horario asignado para el día de hoy', HttpStatus.FORBIDDEN);
    }
    
    private calculateTimeRanges(currentDaySchedule: DetailSchedule, now: Date) {
        const startHourParts = currentDaySchedule.startHour.split(":");
        const endHourParts = currentDaySchedule.endHour.split(":");

        const startHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(startHourParts[0]), parseInt(startHourParts[1]));
        const endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(endHourParts[0]), parseInt(endHourParts[1]));

        const currentHour = now.getTime();

        const allowedStartTime = startHour.getTime() - 10 * 60 * 1000;
        const allowedEndTime = endHour.getTime() + 10 * 60 * 1000;
        return { currentHour, allowedStartTime, allowedEndTime };
    }

    private getCurrentDaySchedule(attendanceRecord: RegisterAssistDto, userExist: Employee) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        const typeRecord = attendanceRecord.recordType;
        
        //Crear enum para los dias de la semana y luego obtener el dia de la semana actual
        const dayOfWeek = this.getDayOfWeek(now.getDay());
        now.setUTCHours(0, 0, 0, 0);
        const currentDaySchedule = userExist.schedule.detailSchedules.find(
            (detailSchedule) => detailSchedule.day === dayOfWeek
        );
        return { currentDaySchedule, now, typeRecord, time };
    }

    private async validations(attendanceRecord: RegisterAssistDto) {
        const userExist = await this.employeeRepository.findOne({
            where: { email: attendanceRecord.employeeEmail },
        });
        if (!userExist) {
            throw new HttpException('El empleado no existe', HttpStatus.NOT_FOUND);
        }

        const isValidZone = await this.verifyZone(attendanceRecord.location, attendanceRecord.employeeEmail);
        if (!isValidZone.isInGeozone) {
            throw new HttpException(isValidZone.message, HttpStatus.CONFLICT);
        }

        const isValidFace = await this.verifyFace(attendanceRecord);
        if (!isValidFace.is_valid) {
            throw new HttpException(isValidFace.message, HttpStatus.BAD_REQUEST);
        }
        return userExist;
    }
}
