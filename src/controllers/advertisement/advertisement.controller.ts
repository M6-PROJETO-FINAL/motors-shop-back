import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import advDeleteService from "../../services/advertisement/advDelete.service";
import AdvListService from "../../services/advertisement/advList.service";
import advUpdateService from "../../services/advertisement/advUpdate.service";
import advertisementCreateService from "../../services/advertisement/advCreate.service";

const advertisementCreateController = async (req: Request, res: Response) => {
  const {
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
  } = req.body;

  const userID = req.user.userId;

  try {
    const newAdvertisement = await advertisementCreateService({
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
    });

    return res.status(201).json(instanceToPlain(newAdvertisement));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

const advertisementListController = async (req: Request, res: Response) => {
  try {
    const advertisements = await AdvListService();

    return res.status(200).json(instanceToPlain(advertisements));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

const advertisementDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const advDelete = await advDeleteService(id);

    return res
      .status(204)
      .json({ message: "Advertisemenet deleted with sucess!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

const advertisementUpdateController = async (req: Request, res: Response) => {
  try {
    const updateValues = req.body;
    const { id } = req.params;

    const advUpdate = await advUpdateService(id, updateValues);

    return res.status(200).json(advUpdate);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

export {
  advertisementCreateController,
  advertisementListController,
  advertisementDeleteController,
  advertisementUpdateController,
};
