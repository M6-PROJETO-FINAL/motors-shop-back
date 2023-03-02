import {
  verifyAuthTokenMiddleware,
  verifyIsSeller,
  verifyOwner,
} from "../../middlewares/index";

import { Router } from "express";
import {
  commentCreateController,
  commentDeleteController,
  commentListController,
  commentUpdateController,
} from "../../controllers/comment/comment.controller";

const commentRoutes = Router();

commentRoutes.post("", verifyAuthTokenMiddleware, commentCreateController);
commentRoutes.get("", commentListController);
commentRoutes.patch("/:id", verifyAuthTokenMiddleware, commentUpdateController);
commentRoutes.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  commentDeleteController
);

export default commentRoutes;
