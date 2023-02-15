import { Router } from "express";
import {
  createBuyerController,
  deleteBuyerController,
  listAllBuyersController,
  // updateBuyerController,
} from "../../controllers/buyer/buyerControllers";

const buyerRoutes = Router();

buyerRoutes.post("", createBuyerController);
buyerRoutes.get("", listAllBuyersController);
// buyerRoutes.patch("", updateBuyerController);
buyerRoutes.patch("/:id", deleteBuyerController);

export default buyerRoutes;
