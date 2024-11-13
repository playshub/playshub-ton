import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1731515458540 implements MigrationInterface {
    name = 'Initialize1731515458540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."aeon_webhook_events_orderstatus_enum" AS ENUM('COMPLETED', 'CLOSE', 'TIMEOUT', 'FAILED', 'DELAY_SUCCESS', 'DELAY_FAILED')`);
        await queryRunner.query(`CREATE TABLE "aeon_webhook_events" ("orderNo" character varying NOT NULL, "orderStatus" "public"."aeon_webhook_events_orderstatus_enum" NOT NULL, "userId" character varying NOT NULL, "merchantOrderNo" character varying NOT NULL, "orderCurrency" character varying NOT NULL, "orderAmount" character varying NOT NULL, "sign" SERIAL NOT NULL, CONSTRAINT "PK_45dfb20673cb4df567214166a6d" PRIMARY KEY ("sign"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "aeon_webhook_events"`);
        await queryRunner.query(`DROP TYPE "public"."aeon_webhook_events_orderstatus_enum"`);
    }

}
