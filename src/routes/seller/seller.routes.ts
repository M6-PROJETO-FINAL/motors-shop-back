import { Router } from "express";
import {
  createSellerController,
  deleteSellerController,
  listAllSellersController,
  updateSellerController,
} from "../../controllers/seller/sellerControllers";
import { verifyAuthTokenMiddleware, verifyOwner } from "../../middlewares";

const sellerRoutes = Router();

sellerRoutes.post("", createSellerController);
sellerRoutes.get("", listAllSellersController);
sellerRoutes.patch("", verifyAuthTokenMiddleware, verifyOwner, updateSellerController);
sellerRoutes.patch("/:id", verifyAuthTokenMiddleware, verifyOwner, deleteSellerController);

export default sellerRoutes;
