import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { ISellerRequest } from "../../interfaces/seller";
import createSellerService from "../../services/seller/createSellerService";
import listAllSellersService from "../../services/seller/listAllSellerService";
// import updateSellerService from "../../services/seller/updateSellerService";
import deleteSellerService from "../../services/seller/deleteSellerService";
import loginSellerService from "../../services/loginSellerService";
import updateSellerService from "../../services/seller/updateSellerService";


const createSellerController = async (req: Request, res: Response) => {
  const seller: ISellerRequest = req.body;
  const createdSeller = await createSellerService(seller);

  return res.status(201).json(instanceToPlain(createdSeller));
};

const listAllSellersController = async (req: Request, res: Response) => {
  const sellers = await listAllSellersService();

  return res.json(instanceToPlain(sellers));
};

const updateSellerController = async (req: Request, res: Response) => {
  try {
    await updateSellerService(req.body, req.params.id);

    return res.status(200).send();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

const deleteSellerController = async (req: Request, res: Response) => {
  const sellerId = req.params.id;
  const deletedSeller = await deleteSellerService(sellerId);

  return res.status(200).json(instanceToPlain(deletedSeller));
};

const loginSellerController = async (req: Request, res: Response) => {
    const seller = req.body
  
    try {
      const token = await loginSellerService(seller)
      return res.status(200).json({token})
    } catch (error) {
        if(error instanceof Error){
            return res.status(403).json({
                message: error.message
        })
      }
     }
  }

export {
  createSellerController,
  listAllSellersController,
  updateSellerController,
  deleteSellerController,
  loginSellerController
};
