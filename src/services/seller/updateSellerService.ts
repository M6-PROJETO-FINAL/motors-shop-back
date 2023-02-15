import { Seller } from "../../entities/seller.entity";
import AppDataSource from "../../data-source";
import { ISellerUpdate } from "../../interfaces/seller/index";
import { AppError } from "../../errors/appError";
const updateSellerService = async (
  {
    name,
    email,
    cpf,
    phone,
    birthdate,
    description,
    address,
    password,
  }: ISellerUpdate,
  id: string
): Promise<Seller> => {
  const sellerRepository = AppDataSource.getRepository(Seller);

  const findSeller = await sellerRepository.findOneBy({
    id,
  });
  if (!findSeller) {
    throw new AppError("User not found", 404);
  }

  await sellerRepository.update(id, {
    ...{ name, email, cpf, phone, birthdate, description, address, password },
  });

  const sellerUpdated = await sellerRepository.findOneBy({
    id,
  });

  return sellerUpdated!;
};

export default updateSellerService;
