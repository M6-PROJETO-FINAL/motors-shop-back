import { Router } from "express";
import {
  createSellerController,
  deleteSellerController,
  listAllSellersController,
  updateSellerController,
} from "../../controllers/seller/sellerControllers";

const sellerRoutes = Router();

sellerRoutes.post("", createSellerController);
sellerRoutes.get("", listAllSellersController);
sellerRoutes.patch("", updateSellerController);
sellerRoutes.patch("/:id", deleteSellerController);

export default sellerRoutes;
