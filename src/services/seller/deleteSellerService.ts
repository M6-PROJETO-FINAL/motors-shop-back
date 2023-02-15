import AppDataSource from "../../data-source";
import { Seller } from "../../entities/seller.entity";
import { AppError } from "../../errors/appError";

const deleteSellerService = async (userId: string) => {
  const sellerRepository = AppDataSource.getRepository(Seller);

  const findSeller = await sellerRepository.findOneBy({
    id: userId,
  });

  if (!findSeller!.active) {
    throw new AppError("User already inactive", 400);
  }

  await sellerRepository.update(userId, {
    active: false,
  });

  return { message: "User deleted successfully" };
};

export default deleteSellerService;
