import AppDataSource from "../../data-source";
import { IBuyerLogin } from "../../interfaces/buyer";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Buyer } from "../../entities/buyer.entity";
import {
  validateEmail,
  validatePassword,
} from "../../validators/buyer/buyerValidators";
import { Seller } from "../../entities/seller.entity";
import { AppError } from "../../errors/appError";
import { compare } from "bcryptjs";

const loginBuyerService = async ({
  email,
  password,
}: IBuyerLogin): Promise<String> => {
  const buyerRepository = AppDataSource.getRepository(Buyer);

  const sellerRepository = AppDataSource.getRepository(Seller);

  const buyer = await buyerRepository.findOneBy({ email: email });

  const seller = await sellerRepository.findOneBy({ email: email });

  await validateEmail(email);

  await validatePassword(password);

  if (!buyer && !seller) {
    throw new Error("Wrong email/password");
  }

  let matchPass;

  if (buyer) {
    matchPass = await compare(password, buyer.password);
  }

  if (seller) {
    matchPass = await compare(password, seller.password);
  }

  if (!matchPass) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      id: buyer ? buyer.id : seller!.id,
      name: buyer ? buyer.name : seller!.name,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
      subject: buyer ? buyer.id : seller!.id,
    }
  );

  return token;
};

export default loginBuyerService;
