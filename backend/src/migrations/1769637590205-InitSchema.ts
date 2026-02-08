import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1769637590205 implements MigrationInterface {
    name = 'InitSchema1769637590205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "download_links" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "fileId" integer, CONSTRAINT "UQ_d848cc5ede2bb40f6f14a604bfa" UNIQUE ("token"), CONSTRAINT "PK_d7faf2620babb1adb81d2075e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "originalName" character varying NOT NULL, "mimeType" character varying NOT NULL, "size" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file_tags" ("file_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_1f87c8da8bf4af5cf7671611b73" PRIMARY KEY ("file_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f5b3ac1a9bc5f37ccf2d3d1334" ON "file_tags" ("file_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e835ce23c5762ac0e54e01b2d5" ON "file_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "download_links" ADD CONSTRAINT "FK_7214bf96cd440d34ec232d7a54f" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_a23484d1055e34d75b25f616792" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_tags" ADD CONSTRAINT "FK_f5b3ac1a9bc5f37ccf2d3d13341" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "file_tags" ADD CONSTRAINT "FK_e835ce23c5762ac0e54e01b2d54" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_tags" DROP CONSTRAINT "FK_e835ce23c5762ac0e54e01b2d54"`);
        await queryRunner.query(`ALTER TABLE "file_tags" DROP CONSTRAINT "FK_f5b3ac1a9bc5f37ccf2d3d13341"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_a23484d1055e34d75b25f616792"`);
        await queryRunner.query(`ALTER TABLE "download_links" DROP CONSTRAINT "FK_7214bf96cd440d34ec232d7a54f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e835ce23c5762ac0e54e01b2d5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f5b3ac1a9bc5f37ccf2d3d1334"`);
        await queryRunner.query(`DROP TABLE "file_tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "download_links"`);
    }

}
