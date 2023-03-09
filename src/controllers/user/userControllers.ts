import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserRequest } from "../../interfaces/user";
import createUserService from "../../services/user/createUserService";
import listAllUsersService from "../../services/user/listAllUersService";
import updateUserService from "../../services/user/updateUserService";
import deleteUserService from "../../services/user/deleteUserService";
import retrieveUserService from "../../services/user/retrieveUserService";
import sendResetPasswordService from "../../services/user/sendResetPasswordService";
import resetUserPasswordService from "../../services/user/resetUserPasswordService";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user: IUserRequest = req.body;
    const createdUser = await createUserService(user);

    return res.status(201).json(instanceToPlain(createdUser));
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
    const users = await listAllUsersService();

    return res.json(instanceToPlain(users));
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
    const user = req.body;
    const id = req.user.userId;
    const updateUser = await updateUserService(user, id);
    return res.json(instanceToPlain(updateUser));
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
    const userId = req.params.id;
    const deletedUser = await deleteUserService(userId);

    return res.status(200).json(instanceToPlain(deletedUser));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).send({
        error: error.name,
        message: error.message,
      });
    }
  }
};

const sendResetUserPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;
  const protocol = req.protocol;
  const host = req.get("host") ?? "";
  await sendResetPasswordService(email, protocol, host);
  return res.json({
    message: "Token send with success!",
  });
};

const resetUserPasswordController = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  await resetUserPasswordService(token, newPassword);
  return res.json({
    message: "Password changed!",
  });
};

export {
  createUserController,
  retrieveUserController,
  listAllUsersController,
  updateUserController,
  deleteUserController,
  sendResetUserPasswordController,
  resetUserPasswordController,
};
