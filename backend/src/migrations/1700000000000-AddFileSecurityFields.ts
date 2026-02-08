import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFileSecurityFields1700000000000 implements MigrationInterface {
  name = 'AddFileSecurityFields1700000000000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" ADD "tags" text`);
    await queryRunner.query(`ALTER TABLE "files" ADD "downloadToken" character varying`);
    await queryRunner.query(`ALTER TABLE "files" ADD "downloadTokenExpiresAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "downloadTokenExpiresAt"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "downloadToken"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "tags"`);
  }
}
