import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { VehicleImages } from "../../entities/vehicleImages.entity";
import { AppError } from "../../errors/appError";
import { IVehicleImage } from "../../interfaces/vehicleImage";
import vehicleImageCreateService from "../vehicleImage/createVehicleImage.service";

const advUpdateService = async (id: string, updateValues: any) => {
  const advRepository = AppDataSource.getRepository(Advertisement);
  const advSelect = await advRepository.findOneBy({ id });
  const vehicleImageRepository = AppDataSource.getRepository(VehicleImages);

  if (!advSelect) {
    throw new AppError("Advertisement not found", 403);
  }

  let vehicleImages = null;

  if (updateValues.vehicleImages) {
    vehicleImages = updateValues.vehicleImages;
    delete updateValues.vehicleImages;
  }

  await advRepository.update(advSelect.id, updateValues);

  if (vehicleImages) {
    for (const vehicleImage of advSelect.vehicleImages) {
      await vehicleImageRepository.remove(vehicleImage);

      await vehicleImageRepository.save(advSelect);
    }

    const arrImg = async (data: string[]): Promise<IVehicleImage[]> => {
      const arrCreate = data.map(async (img) => {
        const newImg = await vehicleImageCreateService(img);
        return newImg;
      });

      const results = await Promise.all(arrCreate);
      return results;
    };

    const createImgs = await arrImg(vehicleImages);

    const updatedAdv = await advRepository.save({
      ...advSelect,
      vehicleImages: createImgs,
    });
    return updatedAdv;
  }

  let advUpdate = await advRepository.findOneBy({ id });

  return advUpdate;
};

export default advUpdateService;
