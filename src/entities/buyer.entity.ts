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
export class Buyer {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  birthdate: Date;

  @Column()
  description: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  type_account: boolean;

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

  @ManyToOne((type) => Address, (address) => address.buyers, {
    eager: true,
  })
  address: Address;

  @OneToMany((type) => Advertisement, (advertisement) => advertisement.buyer, {
    eager: true,
  })
  advertisements: Advertisement[];

  constructor() {
    if (!this.type_account) {
      this.type_account = false;
    }
  }
}
