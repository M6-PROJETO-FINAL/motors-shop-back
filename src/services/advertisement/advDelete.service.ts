import {AppDataSource} from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors/appError";

const advDeleteService = async (id: string) => {
  const advRepository = AppDataSource.getRepository(Advertisement);

  const advSelect = await advRepository.findOneBy({ id });

  if (!advSelect) {
    throw new AppError("Advertisement not found!", 403);
  }

  await advRepository.delete(advSelect.id);

  return true;
};

export default advDeleteService;
