import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1724510383168 implements MigrationInterface {
    name = 'Init1724510383168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Playlist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_cbf731d0c3b4c18ee9930d14790" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "apiKey" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "Playlist" ADD CONSTRAINT "FK_f781e4828ac36036bc49f6c6aee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_e57cb12579da897e196b6e0b1f6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_e57cb12579da897e196b6e0b1f6"`);
        await queryRunner.query(`ALTER TABLE "Playlist" DROP CONSTRAINT "FK_f781e4828ac36036bc49f6c6aee"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "apiKey"`);
        await queryRunner.query(`DROP TABLE "Playlist"`);
    }

}
