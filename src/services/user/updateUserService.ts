import { AppDataSource } from "../../data-source";
import { User } from "./../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/user/index";
import { AppError } from "../../errors/appError";
import { Address } from "../../entities/address.entity";
import { hash } from "bcrypt";

const updateUserService = async (
  {
    fullName,
    email,
    cpf,
    cellPhone,
    birthdate,
    description,
    address: addressReq,
    password,
  }: IUserUpdate,
  id: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const findUser = await userRepository.findOne({
    where: {
      id,
    },
    relations: {
      address: true,
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const newaddressObj = {
    state: addressReq?.state ? addressReq.state : findUser.address.state,
    city: addressReq?.city ? addressReq.city : findUser.address.city,
    street: addressReq?.street ? addressReq.street : findUser.address.street,
    zipCode: addressReq?.zipCode
      ? addressReq.zipCode
      : findUser.address.zipCode,
    number: addressReq?.number ? addressReq.number : findUser.address.number,
    complement: addressReq?.complement
      ? addressReq.complement
      : findUser.address.complement,
  };

  const newAddress = addressRepository.create(newaddressObj);
  const findAddress = await addressRepository.findOneBy({
    id: newAddress.id,
  });

  await userRepository.update(id, {
    fullName: fullName ? fullName : findUser.fullName,
    email: email ? email : findUser.email,
    cpf: cpf ? cpf : findUser.cpf,
    cellPhone: cellPhone ? cellPhone : findUser.cellPhone,
    birthdate: birthdate ? birthdate : findUser.birthdate,
    description: description ? description : findUser.description,
    password: password ? await hash(password, 10) : findUser.password,
  });

  await addressRepository.update(findAddress!.id, newaddressObj);

  const userUpdated = await userRepository.findOneBy({
    id,
  });

  return userUpdated!;
};

export default updateUserService;
