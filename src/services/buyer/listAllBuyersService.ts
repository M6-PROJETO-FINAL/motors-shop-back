import AppDataSource from "../../data-source";
import { Buyer } from "../../entities/buyer.entity";

const listAllBuyersService = async (): Promise<Buyer[]> => {
  const buyerRepository = AppDataSource.getRepository(Buyer);
  const buyers = await buyerRepository.find();

  return buyers;
};

export default listAllBuyersService;
