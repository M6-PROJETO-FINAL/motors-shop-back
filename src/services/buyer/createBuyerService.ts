import { AppError } from "../../errors/appError";
import { IBuyerRequest } from "../../interfaces/buyer";
import {
  validateEmail,
  validatePassword,
} from "../../validators/buyer/buyerValidators";
import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Buyer } from "../../entities/buyer.entity";
import createAddressService from "../address/createAddressService";

const createBuyerService = async ({
  name,
  email,
  cpf,
  phone,
  birthdate,
  description,
  address,
  password,
  type_account,
  active,
}: IBuyerRequest): Promise<Buyer> => {
  const buyerRepository = AppDataSource.getRepository(Buyer);
  if (!password) {
    throw new AppError("Password is missing", 400);
  }

  await validateEmail(email);

  await validatePassword(password);

  const hashedPassword = await hash(password, 10);

  const newAddress = await createAddressService(address);

  const newBuyer = buyerRepository.create({
    name,
    email,
    cpf,
    phone,
    birthdate,
    description,
    address: newAddress,
    password: hashedPassword,
    type_account,
    active,
  });

  const userAlreadyExists = await buyerRepository.findOneBy({
    email,
  });

  if (userAlreadyExists) {
    throw new AppError("Email is already exists", 409);
  }

  await buyerRepository.save(newBuyer);

  return newBuyer;
};

export default createBuyerService;
