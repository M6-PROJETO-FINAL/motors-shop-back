import { Router } from "express";
import { loginBuyerController } from "../../controllers/session/sessionController";

const commentRoutes = Router();

commentRoutes.post("", loginBuyerController);

export default commentRoutes;
