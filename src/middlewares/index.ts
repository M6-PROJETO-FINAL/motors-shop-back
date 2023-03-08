import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {AppDataSource} from "../data-source";
import { User } from "./../entities/user.entity";
import { AppError } from "../errors/appError";
import { Advertisement } from "../entities/advertisement.entity";

export const verifyAuthTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
      if (error) {
        return res.status(401).send({ message: "Invalid Token" });
      }

      req.user = {
        userId: decoded.id,
        userName: decoded.name,
        userType: decoded.type,
      };

      next();
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const verifyIsSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user.userId;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOneBy({
      id: id,
    });

    if (!userFound?.isSeller) {
      throw new AppError("User is not seller", 403);
    }
    next();
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const verifyOwner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let logged = req.user.userId;
    let onRequest = req.params.id;

    if (logged != onRequest) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const verifyIsOwnerAdv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user.userId;
    let advSelect = req.params.id;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOneBy({
      id: id,
    });

    const advRepository = AppDataSource.getRepository(Advertisement);

    const advFound = await advRepository.findOneBy({ id: advSelect });

    if (!advFound) {
      throw new AppError("Advertisement is not valid", 403);
    }

    if (
      !userFound?.advertisements.some(
        (advertisement) => advertisement.id === advFound.id
      )
    ) {
      throw new AppError("User is not seller about this advertisement", 401);
    }

    next();
  } catch (err) {
    return res.status(400).send(err);
  }
};
