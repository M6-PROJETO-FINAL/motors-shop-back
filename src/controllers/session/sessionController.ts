import { Request, Response } from "express";
import loginBuyerService from "../../services/session/loginService";

const loginBuyerController = async (req: Request, res: Response) => {
  const login = req.body;

  try {
    const token = await loginBuyerService(login);
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

export { loginBuyerController };
