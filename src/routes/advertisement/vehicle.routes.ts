import {
  verifyAuthTokenMiddleware,
  verifyIsSeller,
  verifyIsOwnerAdv,
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
  verifyIsOwnerAdv,
  advertisementDeleteController
);

advertisementRoutes.patch(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyIsOwnerAdv,
  advertisementUpdateController
);

export default advertisementRoutes;
