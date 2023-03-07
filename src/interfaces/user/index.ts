import { IAddress } from "../address";

export interface IUserRequest {
  fullName: string;
  email: string;
  cpf: string;
  cellPhone: string;
  birthdate: Date;
  description: string;
  address: IAddress;
  password: string;
  isSeller: boolean;
  active: boolean;
}

export interface IUserUpdate {
  fullName?: string;
  email?: string;
  cpf?: string;
  cellPhone?: string;
  birthdate?: Date;
  description?: string;
  address?: IAddress;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
