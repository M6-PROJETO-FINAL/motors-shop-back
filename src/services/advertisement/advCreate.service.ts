import { User } from "../../entities/user.entity";
import { Advertisement } from "../../entities/advertisement.entity";
import {AppDataSource} from "../../data-source";
import { AppError } from "../../errors/appError";
import { IAdvertisementCreate } from "../../interfaces/advertisement";
import { IVehicleImage } from "../../interfaces/vehicleImage";
import vehicleImageCreateService from "../vehicleImage/createVehicleImage.service";

const advertisementCreateService = async ({
  type,
  title,
  year,
  km,
  price,
  description,
  type_veihcle,
  image_cover,
  first_image,
  vehicleImages,
  userID,
}: IAdvertisementCreate) => {
  if (
    !type ||
    !title ||
    !year ||
    !km ||
    !price ||
    !description ||
    !type_veihcle ||
    !image_cover ||
    !first_image ||
    !vehicleImages
  ) {
    throw new AppError(
      "Fields: type, title, year, km, price, description, type_veihcle, image_cover, first_image and vehicleImages is necessary",
      400
    );
  }

  if (type_veihcle !== "car" && type_veihcle !== "motorhicle") {
    throw new AppError(
      "Type veihcle: Only car or motorhicle are accepted.",
      400
    );
  }

  if (type !== "sale" && type !== "auction") {
    throw new AppError(
      "Type Advertisemenet: Only Sale or Auction are accepted.",
      400
    );
  }

  const userRepository = AppDataSource.getRepository(User);
  const advertisementRepository = AppDataSource.getRepository(Advertisement);

  const user = await userRepository.findOneBy({ id: userID });

  if (!user) {
    throw new AppError("User not found!", 403);
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

  const newAdvertisement = advertisementRepository.create({
    type,
    title,
    year,
    km,
    price,
    description,
    type_veihcle,
    image_cover,
    first_image,
    vehicleImages: createImgs,
    user,
  });

  const completeAdvertisiment = await advertisementRepository.save(
    newAdvertisement
  );

  return completeAdvertisiment;
};

export default advertisementCreateService;
