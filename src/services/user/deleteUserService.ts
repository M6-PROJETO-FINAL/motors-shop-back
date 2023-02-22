import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser!.active) {
    throw new AppError("User already inactive", 400);
  }

  await userRepository.update(userId, {
    active: false,
  });

  return { message: "User deleted successfully" };
};

export default deleteUserService;
