import {
  verifyAuthTokenMiddleware,
  verifyIsSeller,
  verifyOwner,
} from "../../middlewares/index";
import { Router } from "express";
import {
  advertisementCreateController,
  advertisementListController,
  advertisementDeleteController,
  advertisementUpdateController,
} from "../../controllers/advertisement/advertisement.controller";

const advertisementRoutes = Router();

advertisementRoutes.post(
  "",
  verifyAuthTokenMiddleware,
  advertisementCreateController
);

advertisementRoutes.get("", advertisementListController);

advertisementRoutes.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyIsSeller,
  advertisementDeleteController
);

advertisementRoutes.patch(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyIsSeller,
  advertisementUpdateController
);

export default advertisementRoutes;
