import { Buyer } from "./../../entities/buyer.entity";
import AppDataSource from "../../data-source";
import { IBuyerUpdate } from "./../../interfaces/buyer/index";
import { AppError } from "../../errors/appError";
const updateBuyerService = async (
  {
    name,
    email,
    cpf,
    phone,
    birthdate,
    description,
    address,
    password,
  }: IBuyerUpdate,
  id: string
): Promise<Buyer> => {
  const buyerRepository = AppDataSource.getRepository(Buyer);

  const findBuyer = await buyerRepository.findOneBy({
    id,
  });
  if (!findBuyer) {
    throw new AppError("User not found", 404);
  }

  await buyerRepository.update(id, {
    ...{ name, email, cpf, phone, birthdate, description, address, password },
  });

  const buyerUpdated = await buyerRepository.findOneBy({
    id,
  });

  return buyerUpdated!;
};

export default updateBuyerService;
