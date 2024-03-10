import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExtensions1710016992562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS cube;`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS earthdistance;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP EXTENSION IF EXISTS earthdistance;`);
        await queryRunner.query(`DROP EXTENSION IF EXISTS cube;`);
    }

}
