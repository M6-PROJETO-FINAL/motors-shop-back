import {
  verifyAuthTokenMiddleware,
  verifyIsSeller,
  verifyOwner,
} from "../../middlewares/index";

import { Router } from "express";
import {
  commentByAdvertisementIdController,
  commentCreateController,
  commentDeleteController,
  commentListController,
  commentUpdateController,
} from "../../controllers/comment/comment.controller";

const commentRoutes = Router();

commentRoutes.post("", verifyAuthTokenMiddleware, commentCreateController);
commentRoutes.get("", commentListController);
commentRoutes.get("/:id", commentByAdvertisementIdController);
commentRoutes.patch("/:id", verifyAuthTokenMiddleware, commentUpdateController);
commentRoutes.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  commentDeleteController
);

export default commentRoutes;
