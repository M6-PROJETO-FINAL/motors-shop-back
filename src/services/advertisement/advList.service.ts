import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { IAdvertisement } from "../../interfaces/advertisement";

const AdvListService = async (): Promise<IAdvertisement[]> => {
  const advRepository = AppDataSource.getRepository(Advertisement);
  const advertisements = await advRepository.find({
    relations: { user: true },
  });

  return advertisements;
};

export default AdvListService;
