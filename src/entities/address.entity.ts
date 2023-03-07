import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

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

  @OneToMany((type) => User, (user) => user.address)
  users: User[];
}
