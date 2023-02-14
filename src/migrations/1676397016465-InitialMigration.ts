import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1676397016465 implements MigrationInterface {
    name = 'InitialMigration1676397016465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seller" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "password" character varying NOT NULL, "type_account" boolean NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "PK_36445a9c6e794945a4a4a8d3c9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(50) NOT NULL, "title" character varying(150) NOT NULL, "year" integer NOT NULL, "km" integer NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "type_veihcle" character varying NOT NULL, "image_cover" character varying NOT NULL, "first_image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "buyerId" uuid, "sellerId" uuid, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buyer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "password" character varying NOT NULL, "type_account" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "addressId" uuid, CONSTRAINT "PK_0480fc3c7289846a31b8e1bc503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipCode" character varying(50) NOT NULL, "state" character varying(150) NOT NULL, "city" character varying(200) NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "seller" ADD CONSTRAINT "FK_d98add500774bd1af452f212553" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_e211f2be72a0c86077330f5ef7b" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_e1dce377fda6902e2f5abdd43da" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyer" ADD CONSTRAINT "FK_f907e099afd02f8303b6e7b5ab6" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyer" DROP CONSTRAINT "FK_f907e099afd02f8303b6e7b5ab6"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_e1dce377fda6902e2f5abdd43da"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_e211f2be72a0c86077330f5ef7b"`);
        await queryRunner.query(`ALTER TABLE "seller" DROP CONSTRAINT "FK_d98add500774bd1af452f212553"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "buyer"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
        await queryRunner.query(`DROP TABLE "seller"`);
    }

}
