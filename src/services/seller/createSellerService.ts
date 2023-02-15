import { AppError } from "../../errors/appError";
import { ISellerRequest } from "../../interfaces/seller";
import {
  validateEmail,
  validatePassword,
} from "../../validators/seller/sellerValidators";
import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Seller } from "../../entities/seller.entity";
import createAddressService from "../address/createAddressService";

const createSellerService = async ({
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
}: ISellerRequest): Promise<Seller> => {
  const sellerRepository = AppDataSource.getRepository(Seller);
  if (!password) {
    throw new AppError("Password is missing", 400);
  }

  await validateEmail(email);

  await validatePassword(password);

  const hashedPassword = await hash(password, 10);

  const newAddress = await createAddressService(address);

  const newSeller = sellerRepository.create({
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

  const userAlreadyExists = await sellerRepository.findOneBy({
    email,
  });

  if (userAlreadyExists) {
    throw new AppError("Email is already exists", 409);
  }

  await sellerRepository.save(newSeller);

  return newSeller;
};

export default createSellerService;
