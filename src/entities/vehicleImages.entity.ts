import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertisement } from "./advertisement.entity";

@Entity("vehicleImages")
export class VehicleImages {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Advertisement, { onDelete: "CASCADE", nullable: true })
  vehicle: Advertisement;
}
