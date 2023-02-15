import AppDataSource from "../../data-source";
import { Seller } from "../../entities/seller.entity";

const listAllSellersService = async (): Promise<Seller[]> => {
  const sellerRepository = AppDataSource.getRepository(Seller);
  const sellers = await sellerRepository.find();

  return sellers;
};

export default listAllSellersService;
