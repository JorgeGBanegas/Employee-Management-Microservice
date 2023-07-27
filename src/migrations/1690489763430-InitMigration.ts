import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1690489763430 implements MigrationInterface {
    name = 'InitMigration1690489763430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_0a0e501362e199a2339881f4869" UNIQUE ("name"), CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "detailSchedule" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "day" "public"."detailSchedule_day_enum" NOT NULL, "start_hour" TIME NOT NULL, "end_hour" TIME NOT NULL, "schedule_id" integer NOT NULL, CONSTRAINT "PK_2f70c5ce0514853b711fc7d125f" PRIMARY KEY ("id", "schedule_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2f70c5ce0514853b711fc7d125" ON "detailSchedule" ("id", "schedule_id") `);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "name" text NOT NULL, "type_of_schedule" "public"."schedule_type_of_schedule_enum" NOT NULL, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "first_name" character varying(60) NOT NULL, "last_name" character varying(60) NOT NULL, "phone_number" character varying(15) NOT NULL, "email" character varying(255) NOT NULL, "gender" "public"."employee_gender_enum" NOT NULL, "birth_date" date NOT NULL, "photo" text NOT NULL, "job_id" integer NOT NULL, "schedule_id" integer NOT NULL, CONSTRAINT "UQ_f51b1053dd9f9375219f75fdf80" UNIQUE ("phone_number"), CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attendanceRecord" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "date" date NOT NULL, "check_in" TIME NOT NULL, "check_out" TIME NOT NULL, "record_type" "public"."attendanceRecord_record_type_enum" NOT NULL, "employee_id" integer, CONSTRAINT "PK_0de04f76b103d40b96abb343bb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "detailSchedule" ADD CONSTRAINT "FK_c68a71786a0e9fe5763e54a2353" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_edf03e5faa1f2be30eee3082a3b" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_6d849e34b04c104b4c76b92fccf" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendanceRecord" ADD CONSTRAINT "FK_e60c44e7d4000b4e2f0140bfc8b" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendanceRecord" DROP CONSTRAINT "FK_e60c44e7d4000b4e2f0140bfc8b"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_6d849e34b04c104b4c76b92fccf"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_edf03e5faa1f2be30eee3082a3b"`);
        await queryRunner.query(`ALTER TABLE "detailSchedule" DROP CONSTRAINT "FK_c68a71786a0e9fe5763e54a2353"`);
        await queryRunner.query(`DROP TABLE "attendanceRecord"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f70c5ce0514853b711fc7d125"`);
        await queryRunner.query(`DROP TABLE "detailSchedule"`);
        await queryRunner.query(`DROP TABLE "job"`);
    }

}
