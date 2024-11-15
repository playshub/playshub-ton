import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1731638270966 implements MigrationInterface {
    name = 'Initialize1731638270966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."purchase_item_orders_status_enum" AS ENUM('INIT', 'PENDING', 'SUCCESS', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "purchase_item_orders" ("orderNo" character varying NOT NULL, "userId" character varying NOT NULL, "itemId" character varying NOT NULL, "amount" character varying NOT NULL, "status" "public"."purchase_item_orders_status_enum" NOT NULL, CONSTRAINT "PK_93b20a71bec0b67ab7610270e58" PRIMARY KEY ("orderNo"))`);
        await queryRunner.query(`CREATE TYPE "public"."check_in_orders_status_enum" AS ENUM('INIT', 'PENDING', 'SUCCESS', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "check_in_orders" ("orderNo" character varying NOT NULL, "userId" character varying NOT NULL, "status" "public"."check_in_orders_status_enum" NOT NULL, "timestamp" integer NOT NULL, CONSTRAINT "PK_dda57d47f6f1fd498120a7a79ee" PRIMARY KEY ("orderNo"))`);
        await queryRunner.query(`CREATE TYPE "public"."aeon_webhook_events_orderstatus_enum" AS ENUM('COMPLETED', 'CLOSE', 'TIMEOUT', 'FAILED', 'DELAY_SUCCESS', 'DELAY_FAILED')`);
        await queryRunner.query(`CREATE TABLE "aeon_webhook_events" ("orderNo" character varying NOT NULL, "orderStatus" "public"."aeon_webhook_events_orderstatus_enum" NOT NULL, "userId" character varying NOT NULL, "merchantOrderNo" character varying NOT NULL, "orderCurrency" character varying NOT NULL, "orderAmount" character varying NOT NULL, "sign" character varying NOT NULL, CONSTRAINT "PK_45dfb20673cb4df567214166a6d" PRIMARY KEY ("sign"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "aeon_webhook_events"`);
        await queryRunner.query(`DROP TYPE "public"."aeon_webhook_events_orderstatus_enum"`);
        await queryRunner.query(`DROP TABLE "check_in_orders"`);
        await queryRunner.query(`DROP TYPE "public"."check_in_orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "purchase_item_orders"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_item_orders_status_enum"`);
    }

}
