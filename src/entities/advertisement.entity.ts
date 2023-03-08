import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { User } from "./user.entity";
import { VehicleImages } from "./vehicleImages.entity";
import { Comment } from "./comments.entity";

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

  @Column({ type: "decimal", precision: 10, scale: 2 })
  km: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column()
  type_veihcle: "car" | "motorhicle";

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

  @ManyToOne((type) => User, (user) => user.advertisements)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.vehicle, {
    onDelete: "CASCADE",
  })
  comment: Comment[];

  @OneToMany(() => VehicleImages, (vehicleImages) => vehicleImages.vehicle, {
    eager: true,
    nullable: true,
  })
  vehicleImages: VehicleImages[];
}
