import { Router } from "express";
import {
  verifyAuthTokenMiddleware,
  verifyOwner,
} from "../../middlewares/index";
import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  retrieveUserController,
  updateUserController,
} from "../../controllers/user/userControllers";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listAllUsersController);
userRoutes.get(
  "/profile",
  verifyAuthTokenMiddleware,
  retrieveUserController
);
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
