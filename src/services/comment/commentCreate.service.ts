import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors/appError";
import { IComment } from "../../interfaces/comment";
import { Comment } from "../../entities/comments.entity";

const commentCreateService = async (
  text: string,
  userID: string,
  advertisementID: string
) => {
  if (!text) {
    throw new AppError("Field: text is necessary", 400);
  }

  const userRepository = AppDataSource.getRepository(User);
  const advRepository = AppDataSource.getRepository(Advertisement);
  const commentRepository = AppDataSource.getRepository(Comment);

  const userAccount = await userRepository.findOneBy({ id: userID });
  const advSelect = await advRepository.findOneBy({ id: advertisementID });

  if (!userAccount) {
    throw new AppError("User not found!", 403);
  }
  if (!advSelect) {
    throw new AppError("Advertisement not found!", 403);
  }

  const commentCreate = commentRepository.create({
    text,
    user: userAccount,
    vehicle: advSelect,
  });

  const commentComplete = commentRepository.save(commentCreate);

  return commentComplete;
};

export default commentCreateService;
