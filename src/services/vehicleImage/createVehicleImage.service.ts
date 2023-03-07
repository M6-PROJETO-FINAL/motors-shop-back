import { VehicleImages } from "../../entities/vehicleImages.entity";
import {AppDataSource} from "../../data-source";
import { IVehicleImageCreate } from "../../interfaces/vehicleImage";

const vehicleImageCreateService = async (url: string) => {
  const vehicleImgRepository = AppDataSource.getRepository(VehicleImages);

  const vehicleImgCreate = vehicleImgRepository.create({
    url,
  });

  const newVehicleImg = await vehicleImgRepository.save(vehicleImgCreate);

  return newVehicleImg;
};

export default vehicleImageCreateService;
