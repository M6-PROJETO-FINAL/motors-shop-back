import { IAddress } from "../../interfaces/address"; 
import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { validateZipCode } from "../../validators/buyer/buyerValidators";

const createAddressService = async ({
  zipCode,
  state,
  city,
  street,
  number,
  complement,
}: IAddress) => {
  const addressRepository = AppDataSource.getRepository(Address);

  await validateZipCode(zipCode);

  const newAddress = addressRepository.create({
    zipCode: zipCode,
    state: state,
    city: city,
    street: street,
    number: number,
    complement: complement,
  });

  await addressRepository.save(newAddress);

  return newAddress;
};

export default createAddressService;
