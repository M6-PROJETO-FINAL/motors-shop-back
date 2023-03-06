import { IComment } from "../comment";
import { IVehicleImage, IVehicleImageCreate } from "../vehicleImage";

export interface IAdvertisementCreate {
  type: string;
  title: string;
  year: number;
  km: number;
  price: number;
  description: string;
  type_veihcle: "car" | "motorhicle";
  image_cover: string;
  first_image: string;
  vehicleImages: string[];
  userID: string;
}

export interface IAdvertisement {
  id: string;
  type: string;
  title: string;
  year: number;
  km: number;
  price: number;
  description: string;
  type_veihcle: "car" | "motorhicle";
  image_cover: string;
  first_image: string;
  vehicleImages: IVehicleImage[];
  comment?: IComment[];
}
