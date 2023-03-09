import { Router } from "express";
import { loginUserController } from "../../controllers/session/sessionController";

const loginRoutes = Router();

loginRoutes.post("", loginUserController);

export default loginRoutes;
