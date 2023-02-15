import AppDataSource from "../../data-source";
import { Buyer } from "../../entities/buyer.entity";
import { AppError } from "../../errors/appError";

const deleteBuyerService = async (userId: string) => {
  const buyerRepository = AppDataSource.getRepository(Buyer);

  const findBuyer = await buyerRepository.findOneBy({
    id: userId,
  });

  if (!findBuyer!.active) {
    throw new AppError("User already inactive", 400);
  }

  await buyerRepository.update(userId, {
    active: false,
  });

  return { message: "User deleted successfully" };
};

export default deleteBuyerService;
