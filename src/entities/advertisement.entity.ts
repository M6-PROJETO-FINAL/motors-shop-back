import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Buyer } from "./buyer.entity";
import { Seller } from "./seller.entity";

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 150 })
  title: string;

  @Column()
  year: number;

  @Column()
  km: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  type_veihcle: string;

  @Column()
  image_cover: string;

  @Column()
  first_image: string;

  @CreateDateColumn({
    name: "created_at",
  })
  created_at: Date;

  @UpdateDateColumn({
    name: "update_at",
  })
  update_at: Date;

  @ManyToOne((type) => Buyer, (buyer) => buyer.advertisements, {
    eager: true,
  })
  buyer: Buyer;

  @ManyToOne((type) => Seller, (seller) => seller.advertisements, {
    eager: true,
  })
  seller: Seller;
}
