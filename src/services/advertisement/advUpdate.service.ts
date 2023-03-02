import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors/appError";

const advUpdateService = async (id: string, updateValues: any) => {
  const advRepository = AppDataSource.getRepository(Advertisement);
  const advSelect = await advRepository.findOneBy({ id });

  if (!advSelect) {
    throw new AppError("Advertisement not found", 403);
  }

  await advRepository.update(advSelect.id, updateValues);

  const advUpdate = advRepository.findOneBy({ id });

  return advUpdate;
};

export default advUpdateService;
