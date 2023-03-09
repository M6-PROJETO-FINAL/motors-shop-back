import { Request, Response } from "express";
import loginUserService from "../../services/session/loginService";

const loginUserController = async (req: Request, res: Response) => {
  const login = req.body;

  try {
    const token = await loginUserService(login);
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

export { loginUserController };
