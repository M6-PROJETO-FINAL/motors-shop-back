import { AppDataSource } from "../../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { IUserLogin } from "../../interfaces/user";
import { User } from "../../entities/user.entity";
import {
  validateEmail,
  validatePassword,
} from "../../validators/user/userValidators";

import { AppError } from "../../errors/appError";
import { compare } from "bcryptjs";

const loginUserService = async ({
  email,
  password,
}: IUserLogin): Promise<String> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: email });

  await validateEmail(email);

  if (!user) {
    throw new AppError("Wrong email/password", 401);
  }

  let matchPass;

  if (user) {
    matchPass = await compare(password, user.password);
  }

  if (!matchPass) {
    throw new AppError("Wrong email or password", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user!.fullName,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
      subject: user!.id,
    }
  );

  return token;
};

export default loginUserService;
