import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Address } from "./address.entity";
import { Advertisement } from "./advertisement.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  cellPhone: string;

  @Column({ type: "date" })
  birthdate: Date;

  @Column()
  description: string;

  @Column({ default: false })
  isSeller: boolean;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({
    name: "created_at",
  })
  created_at: Date;

  @UpdateDateColumn({
    name: "update_at",
  })
  update_at: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne((type) => Address, (address) => address.users, {
    eager: true,
  })
  address: Address;

  @OneToMany((type) => Advertisement, (advertisement) => advertisement.user, {
    eager: true,
  })
  advertisements: Advertisement[];
}
