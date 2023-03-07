import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserRequest, IUserUpdate } from "../../interfaces/user";
import createUserService from "../../services/user/createUserService";
import listAllUsersService from "../../services/user/listAllUersService";
import updateUserService from "../../services/user/updateUserService";
import deleteUserService from "../../services/user/deleteUserService";
import retrieveUserService from "../../services/user/retrieveUserService";

const createUserController = async (req: Request, res: Response) => {
  try {
    const buyer: IUserRequest = req.body;
    const createdBuyer = await createUserService(buyer);

    return res.status(201).json(instanceToPlain(createdBuyer));
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Error) {
        return res.status(400).send({
          error: error.name,
          message: error.message,
        });
      }
    }
  }
};

const retrieveUserController = async (req: Request, res: Response) => {
  try {
    const id: string = req.user.userId;
    const user = await retrieveUserService(id);
    return res.json(instanceToPlain(user));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const listAllUsersController = async (req: Request, res: Response) => {
  try {
    const buyers = await listAllUsersService();

    return res.json(instanceToPlain(buyers));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const buyerId = req.params.id;
    const deletedBuyer = await deleteUserService(buyerId);

    return res.status(200).json(instanceToPlain(deletedBuyer));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export {
  createUserController,
  retrieveUserController,
  listAllUsersController,
  updateUserController,
  deleteUserController,
};
