import {
  verifyAuthTokenMiddleware,
  verifyIsSeller,
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
  "/:id",
  verifyAuthTokenMiddleware,
  verifyOwner,
  updateUserController
);
userRoutes.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyOwner,
  deleteUserController
);

export default userRoutes;
