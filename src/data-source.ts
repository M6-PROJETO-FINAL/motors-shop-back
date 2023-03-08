import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import { Address } from "./entities/address.entity";
import { Advertisement } from "./entities/advertisement.entity";
import { User } from "./entities/user.entity";
import { Comment } from "./entities/comments.entity";
import { VehicleImages } from "./entities/vehicleImages.entity";
import { alterType1678110644431 } from "./migrations/1678110644431-alterType";
import { updateNull1678310714526 } from "./migrations/1678310714526-updateNull";

import "reflect-metadata";

const dataSourceConfig = (): DataSourceOptions => {
  const nodeEnv: string = process.env.NODE_ENV!;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [Address, Advertisement, Comment, User, VehicleImages],
      migrations: [alterType1678110644431, updateNull1678310714526],
    };
  }

  return {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    entities: [Address, Advertisement, Comment, User, VehicleImages],
    migrations: [alterType1678110644431, updateNull1678310714526],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
