import { MigrationInterface, QueryRunner } from "typeorm";

export class INIT1710106411368 implements MigrationInterface {
    name = 'INIT1710106411368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bill" ("id" SERIAL NOT NULL, "distance" integer NOT NULL, "total" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, "passenger_id" integer, "trip_id" integer, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."driver_status_enum" AS ENUM('ACTIVE', 'BUSY')`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" SERIAL NOT NULL, "name" character varying(255), "status" "public"."driver_status_enum" NOT NULL DEFAULT 'ACTIVE', "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."trip_status_enum" AS ENUM('ACTIVE', 'COMPLETED')`);
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "status" "public"."trip_status_enum" NOT NULL DEFAULT 'ACTIVE', "origin_latitude" double precision NOT NULL, "origin_longitude" double precision NOT NULL, "destination_latitude" double precision NOT NULL, "destination_longitude" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, "passenger_id" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "name" character varying(255), "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_78a2583c223a3a5ca538512d33b" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_05ead9ea38b5468f6b4fb14b2de" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_37939f1641eb72cc2c0f326bbe0" FOREIGN KEY ("trip_id") REFERENCES "trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_f314f86bf8e02aff0cc32b5e271" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_3d9a53e115529549f9e8d974b52" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_3d9a53e115529549f9e8d974b52"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_f314f86bf8e02aff0cc32b5e271"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_37939f1641eb72cc2c0f326bbe0"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_05ead9ea38b5468f6b4fb14b2de"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_78a2583c223a3a5ca538512d33b"`);
        await queryRunner.query(`DROP TABLE "passenger"`);
        await queryRunner.query(`DROP TABLE "trip"`);
        await queryRunner.query(`DROP TYPE "public"."trip_status_enum"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TYPE "public"."driver_status_enum"`);
        await queryRunner.query(`DROP TABLE "bill"`);
    }

}
