import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

export default AppDataSource;
