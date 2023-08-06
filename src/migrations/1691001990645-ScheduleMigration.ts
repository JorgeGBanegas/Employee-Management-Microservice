import { MigrationInterface, QueryRunner } from "typeorm";

export class ScheduleMigration1691001990645 implements MigrationInterface {
    name = 'ScheduleMigration1691001990645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendanceRecord" DROP COLUMN "check_in"`);
        await queryRunner.query(`ALTER TABLE "attendanceRecord" DROP COLUMN "check_out"`);
        await queryRunner.query(`ALTER TABLE "attendanceRecord" ADD "check" TIME NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendanceRecord" DROP COLUMN "check"`);
        await queryRunner.query(`ALTER TABLE "attendanceRecord" ADD "check_out" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendanceRecord" ADD "check_in" TIME NOT NULL`);
    }

}
