import {AppDataSource} from "../../data-source";
import { User } from "./../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/user/index";
import { AppError } from "../../errors/appError";
const updateUserService = async (
  {
    fullName,
    email,
    cpf,
    cellPhone,
    birthdate,
    description,
    address,
    password,
  }: IUserUpdate,
  id: string
): Promise<User> => {
  const buyerRepository = AppDataSource.getRepository(User);

  const findBuyer = await buyerRepository.findOneBy({
    id,
  });

  if (!findBuyer) {
    throw new AppError("User not found", 404);
  }

  await buyerRepository.update(id, {
    ...{
      fullName,
      email,
      cpf,
      cellPhone,
      birthdate,
      description,
      address,
      password,
    },
  });

  const buyerUpdated = await buyerRepository.findOneBy({
    id,
  });

  return buyerUpdated!;
};

export default updateUserService;
