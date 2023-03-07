import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/user";
import {
  validateEmail,
  validatePassword,
} from "../../validators/user/userValidators";
import { hash } from "bcryptjs";
import {AppDataSource} from "../../data-source";
import { User } from "../../entities/user.entity";
import createAddressService from "../address/createAddressService";

const createUserService = async ({
  fullName,
  email,
  cpf,
  cellPhone,
  birthdate,
  description,
  address,
  password,
  isSeller,
  active,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  if (!password) {
    throw new AppError("Password is missing", 400);
  }

  await validateEmail(email);

  await validatePassword(password);

  const hashedPassword = await hash(password, 10);

  const newAddress = await createAddressService(address);

  const newUser = userRepository.create({
    fullName,
    email,
    cpf,
    cellPhone,
    birthdate,
    address: newAddress,
    description,
    isSeller,
    password: hashedPassword,
    active,
  });

  const userAlreadyExists = await userRepository.findOneBy({
    email,
  });

  if (userAlreadyExists) {
    throw new AppError("Email is already exists", 409);
  }

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
