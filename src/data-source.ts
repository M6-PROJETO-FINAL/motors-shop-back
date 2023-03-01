import { DataSource } from "typeorm";
import "dotenv/config";
import { Address } from "./entities/address.entity";
import { Advertisement } from "./entities/advertisement.entity";
import { User } from "./entities/user.entity";
import { Comment } from "./entities/comments.entity";
import { VehicleImages } from "./entities/vehicleImages.entity";
import { Initial1677693890145 } from "./migrations/1677693890145-Initial";

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [Address, Advertisement, Comment, User, VehicleImages],
  migrations: [Initial1677693890145],
});

export default AppDataSource;
