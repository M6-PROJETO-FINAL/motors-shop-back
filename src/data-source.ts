import { DataSource } from "typeorm";
import "dotenv/config";
import { Address } from "./entities/address.entity";
import { Advertisement } from "./entities/advertisement.entity";
import { Buyer } from "./entities/buyer.entity";
import { Seller } from "./entities/seller.entity";
import { InitialMigration1676397016465 } from "./migrations/1676397016465-InitialMigration";


const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [Address, Advertisement, Buyer, Seller],
  migrations: [InitialMigration1676397016465],
});

export default AppDataSource;
