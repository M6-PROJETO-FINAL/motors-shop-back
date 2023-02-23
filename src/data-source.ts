import { DataSource } from "typeorm";
import "dotenv/config";
import { Address } from "./entities/address.entity";
import { Advertisement } from "./entities/advertisement.entity";
import { User } from './entities/user.entity';
import { InitialMigrations1676898053277  } from "./migrations/1676898053277-InitialMigrations";
import {migrations1677177211911} from "./migrations/1677177211911-migrations"
import { Comment } from "./entities/comments.entity";
import { VehicleImages } from "./entities/vehicleImages.entity";


const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [Address, Advertisement, User, Comment, VehicleImages ],
  migrations: [migrations1677177211911],
});

export default AppDataSource;
