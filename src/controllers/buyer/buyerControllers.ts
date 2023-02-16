import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IBuyerRequest, IBuyerUpdate } from "../../interfaces/buyer";
import createBuyerService from "../../services/buyer/createBuyerService";
import listAllBuyersService from "../../services/buyer/listAllBuyersService";
import updateBuyerService from "../../services/buyer/updateBuyerService";
import deleteBuyerService from "../../services/buyer/deleteBuyerService";

const createBuyerController = async (req: Request, res: Response) => {
  const buyer: IBuyerRequest = req.body;
  const createdBuyer = await createBuyerService(buyer);

  return res.status(201).json(instanceToPlain(createdBuyer));
};

const listAllBuyersController = async (req: Request, res: Response) => {
  const buyers = await listAllBuyersService();

  return res.json(instanceToPlain(buyers));
};

const updateBuyerController = async (req: Request, res: Response) => {
  const {
    name,
    email,
    cpf,
    phone,
    birthdate,
    description,
    address,
    password,
  }: IBuyerUpdate = req.body;
  const id = req.user.userId;
  const updateBuyer = await updateBuyerService(
    {
      name,
      email,
      cpf,
      phone,
      birthdate,
      description,
      address,
      password,
    },
    id
  );

  return res.json(instanceToPlain(updateBuyer));
};

const deleteBuyerController = async (req: Request, res: Response) => {
  const buyerId = req.params.id;
  const deletedBuyer = await deleteBuyerService(buyerId);

  return res.status(200).json(instanceToPlain(deletedBuyer));
};

export {
  createBuyerController,
  listAllBuyersController,
  updateBuyerController,
  deleteBuyerController,
};
