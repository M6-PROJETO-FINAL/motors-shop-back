import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IBuyerRequest } from "../../interfaces/buyer";
import createBuyerService from "../../services/buyer/createBuyerService";
import listAllBuyersService from "../../services/buyer/listAllBuyersService";
// import updateBuyerService from "../../services/buyer/updateBuyerService";
import deleteBuyerService from "../../services/buyer/deleteBuyerService";
import loginBuyerService from "../../services/loginBuyerService";


const createBuyerController = async (req: Request, res: Response) => {
  const buyer: IBuyerRequest = req.body;
  const createdBuyer = await createBuyerService(buyer);

  return res.status(201).json(instanceToPlain(createdBuyer));
};

const listAllBuyersController = async (req: Request, res: Response) => {
  const buyers = await listAllBuyersService();

  return res.json(instanceToPlain(buyers));
};

// const updateBuyerController = async (req: Request, res: Response) => {
//   const buyerUpdate = req.body;
//   const id = req.buyer.id;
//   const updateBuyer = await updateBuyerService(buyerUpdate, id);

//   return res.json(instanceToPlain(updateBuyer));
// };

const deleteBuyerController = async (req: Request, res: Response) => {
  const buyerId = req.params.id;
  const deletedBuyer = await deleteBuyerService(buyerId);

  return res.status(200).json(instanceToPlain(deletedBuyer));
};

const loginBuyerController = async (req: Request, res: Response) => {
    const buyer = req.body
  
    try {
      const token = await loginBuyerService(buyer)
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
  createBuyerController,
  listAllBuyersController,
  // updateBuyerController,
  deleteBuyerController,
  loginBuyerController
};
