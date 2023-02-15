import { IAddress } from "../address";

export interface IBuyerRequest {
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

export interface IBuyerUpdate {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  birthdate?: Date;
  description?: string;
  address?: IAddress;
  password?: string;
}

export interface IBuyerLogin {
    email: string;
    password: string;
}

