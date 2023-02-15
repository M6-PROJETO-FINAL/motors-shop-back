import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";

import { Buyer } from "./buyer.entity";
import { Seller } from "./seller.entity";

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  zipCode: string;

  @Column({ length: 150 })
  state: string;

  @Column({ length: 200 })
  city: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @CreateDateColumn({
    name: "created_at",
  })
  created_at: Date;

  @UpdateDateColumn({
    name: "update_at",
  })
  update_at: Date;

  @OneToMany((type) => Buyer, (buyer) => buyer.address, {
    // eager: true,
  })
  buyers: Buyer[];

  @OneToMany((type) => Seller, (seller) => seller.address, {
    // eager: true,
  })
  sellers: Seller[];
}
