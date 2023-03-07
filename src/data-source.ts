import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import { Address } from "./entities/address.entity";
import { Advertisement } from "./entities/advertisement.entity";
import { User } from "./entities/user.entity";
import { Comment } from "./entities/comments.entity";
import { VehicleImages } from "./entities/vehicleImages.entity";
import { alterType1678110644431 } from "./migrations/1678110644431-alterType";

import "reflect-metadata";


const dataSourceConfig = (): DataSourceOptions => {

  return {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PWD,
    database: process.env.POSTGRES_DB,
    logging: false,
    entities: [Address, Advertisement, Comment, User, VehicleImages],
    migrations: [alterType1678110644431],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());




