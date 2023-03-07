import { Router } from "express";
import { loginBuyerController } from "../../controllers/session/sessionController";

const loginRoutes = Router();

loginRoutes.post("", loginBuyerController);

export default loginRoutes;
