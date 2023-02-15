import { IAddress } from "../address";

export interface ISellerRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthdate: Date;
  description: string;
  address: IAddress;
  password: string;
  type_account: boolean;
  active: boolean;
}

export interface ISellerUpdate {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  birthdate?: Date;
  description?: string;
  address?: IAddress;
  password?: string;
}

export interface ISellerLogin {
    email: string;
    password: string;
}

