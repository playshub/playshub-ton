import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1731637883070 implements MigrationInterface {
    name = 'Initialize1731637883070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."purchase_item_orders_status_enum" AS ENUM('INIT', 'PENDING', 'SUCCESS', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "purchase_item_orders" ("orderNo" character varying NOT NULL, "userId" character varying NOT NULL, "itemId" character varying NOT NULL, "amount" character varying NOT NULL, "status" "public"."purchase_item_orders_status_enum" NOT NULL, CONSTRAINT "PK_93b20a71bec0b67ab7610270e58" PRIMARY KEY ("orderNo"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "purchase_item_orders"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_item_orders_status_enum"`);
    }

}
