import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserRequest, IUserUpdate } from "../../interfaces/user";
import createUserService from "../../services/user/createUserService";
import listAllUsersService from "../../services/user/listAllUersService";
import updateUserService from "../../services/user/updateUserService";
import deleteUserService from "../../services/user/deleteUserService";

const createUserController = async (req: Request, res: Response) => {
  const buyer: IUserRequest = req.body;
  const createdBuyer = await createUserService(buyer);

  return res.status(201).json(instanceToPlain(createdBuyer));
};

const listAllUsersController = async (req: Request, res: Response) => {
  const buyers = await listAllUsersService();

  return res.json(instanceToPlain(buyers));
};

const updateUserController = async (req: Request, res: Response) => {
  const {
    fullName,
    email,
    cpf,
    cellPhone,
    birthdate,
    description,
    address,
    password,
  }: IUserUpdate = req.body;
  const id = req.user.userId;
  const updateBuyer = await updateUserService(
    {
      fullName,
      email,
      cpf,
      cellPhone,
      birthdate,
      description,
      address,
      password,
    },
    id
  );

  return res.json(instanceToPlain(updateBuyer));
};

const deleteUserController = async (req: Request, res: Response) => {
  const buyerId = req.params.id;
  const deletedBuyer = await deleteUserService(buyerId);

  return res.status(200).json(instanceToPlain(deletedBuyer));
};

export {
  createUserController,
  listAllUsersController,
  updateUserController,
  deleteUserController,
};
