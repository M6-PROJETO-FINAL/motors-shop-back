import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

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
        userType: decoded.type
      };

      next();
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};


export const verifySeller = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let type = req.user.userType;
  
      if (type != 'seller') {
        return res.status(401).json({ message: "Unauthorized" });
      }

        next();
      ;
    } catch (err) {
      return res.status(400).send(err);
    }
  };


  export const verifyBuyer = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let type = req.user.userType;
  
      if (type != 'buyer') {
        return res.status(401).json({ message: "Unauthorized" });
      }

        next();
      ;
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
      ;
    } catch (err) {
      return res.status(400).send(err);
    }
  };