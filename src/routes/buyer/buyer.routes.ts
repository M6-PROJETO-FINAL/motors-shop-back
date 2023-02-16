import {
  verifyAuthTokenMiddleware,
  verifyBuyer,
  verifyOwner,
} from "./../../middlewares/index";
import { Router } from "express";
import {
  createBuyerController,
  deleteBuyerController,
  listAllBuyersController,
  updateBuyerController,
} from "../../controllers/buyer/buyerControllers";

const buyerRoutes = Router();

buyerRoutes.post("", createBuyerController);
buyerRoutes.get("", listAllBuyersController);
buyerRoutes.patch(
  "",
  verifyAuthTokenMiddleware,
  verifyBuyer,
  updateBuyerController
);
buyerRoutes.patch(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyBuyer,
  deleteBuyerController
);

export default buyerRoutes;
