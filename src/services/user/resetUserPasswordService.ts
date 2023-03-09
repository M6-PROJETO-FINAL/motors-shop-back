import { AppDataSource } from "./../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { hash } from "bcrypt";

const resetUserPasswordService = async (
  token: string,
  newPassword: string
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      tokenResetPassword: token,
    },
  });

  if (!user) {
    throw new AppError("User not found");
  }

  const hashedPassword = await hash(newPassword, 10);

  await userRepository.update(
    {
      id: user.id,
    },
    {
      tokenResetPassword: "",
      password: hashedPassword,
    }
  );
};

export default resetUserPasswordService;
