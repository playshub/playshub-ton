import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1731573797837 implements MigrationInterface {
    name = 'Initialize1731573797837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."aeon_webhook_events_orderstatus_enum" AS ENUM('COMPLETED', 'CLOSE', 'TIMEOUT', 'FAILED', 'DELAY_SUCCESS', 'DELAY_FAILED')`);
        await queryRunner.query(`CREATE TABLE "aeon_webhook_events" ("orderNo" character varying NOT NULL, "orderStatus" "public"."aeon_webhook_events_orderstatus_enum" NOT NULL, "userId" character varying NOT NULL, "merchantOrderNo" character varying NOT NULL, "orderCurrency" character varying NOT NULL, "orderAmount" character varying NOT NULL, "sign" character varying NOT NULL, CONSTRAINT "PK_45dfb20673cb4df567214166a6d" PRIMARY KEY ("sign"))`);
        await queryRunner.query(`CREATE TYPE "public"."check_in_orders_status_enum" AS ENUM('INIT', 'PENDING', 'SUCCESS', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "check_in_orders" ("orderNo" character varying NOT NULL, "userId" character varying NOT NULL, "status" "public"."check_in_orders_status_enum" NOT NULL, "timestamp" integer NOT NULL, CONSTRAINT "PK_dda57d47f6f1fd498120a7a79ee" PRIMARY KEY ("orderNo"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "check_in_orders"`);
        await queryRunner.query(`DROP TYPE "public"."check_in_orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "aeon_webhook_events"`);
        await queryRunner.query(`DROP TYPE "public"."aeon_webhook_events_orderstatus_enum"`);
    }

}
