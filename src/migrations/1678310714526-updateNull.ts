import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class updateNull1678310714526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Altera a coluna vehicleId para permitir valores nulos
    await queryRunner.changeColumn(
      "vehicleImages",
      "vehicleId",
      new TableColumn({
        name: "vehicleId",
        type: "uuid",
        isNullable: true,
      })
    );

    // Altera a coluna url para permitir valores nulos
    await queryRunner.query(
      `ALTER TABLE "vehicleImages" ALTER COLUMN "url" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverte as alterações feitas na coluna vehicleId
    await queryRunner.changeColumn(
      "vehicleImages",
      "vehicleId",
      new TableColumn({
        name: "vehicleId",
        type: "uuid",
        isNullable: false,
      })
    );

    // Reverte as alterações feitas na coluna url
    await queryRunner.query(
      `ALTER TABLE "vehicleImages" ALTER COLUMN "url" SET NOT NULL`
    );
  }
}
