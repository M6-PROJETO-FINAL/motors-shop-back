import {
  verifyAuthTokenMiddleware,
  verifyBuyer,
  verifyOwner,
} from "../../middlewares/index";
import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  updateUserController,
} from "../../controllers/buyer/buyerControllers";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listAllUsersController);
userRoutes.patch(
  "",
  verifyAuthTokenMiddleware,
  verifyBuyer,
  updateUserController
);
userRoutes.patch(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyBuyer,
  deleteUserController
);

export default userRoutes;
