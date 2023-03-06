import { MigrationInterface, QueryRunner } from "typeorm";

export class alterType1678110644431 implements MigrationInterface {
    name = 'alterType1678110644431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicleImages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "vehicleId" uuid, CONSTRAINT "PK_ffdc96d130a4306242b6e8683af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "vehicleId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(50) NOT NULL, "title" character varying(150) NOT NULL, "year" integer NOT NULL, "km" numeric(10,2) NOT NULL, "price" numeric(10,2) NOT NULL, "description" character varying NOT NULL, "type_veihcle" character varying NOT NULL, "image_cover" character varying NOT NULL, "first_image" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "cellPhone" character varying NOT NULL, "birthdate" date NOT NULL, "description" character varying NOT NULL, "isSeller" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "addressId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipCode" character varying(50) NOT NULL, "state" character varying(150) NOT NULL, "city" character varying(200) NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicleImages" ADD CONSTRAINT "FK_d4494157be45b0ec3359b079556" FOREIGN KEY ("vehicleId") REFERENCES "advertisement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1780f918d3523791d18590d67a4" FOREIGN KEY ("vehicleId") REFERENCES "advertisement"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_6ec9d86e7c48126869b4c7f22db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_6ec9d86e7c48126869b4c7f22db"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1780f918d3523791d18590d67a4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "vehicleImages" DROP CONSTRAINT "FK_d4494157be45b0ec3359b079556"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "vehicleImages"`);
    }

}
