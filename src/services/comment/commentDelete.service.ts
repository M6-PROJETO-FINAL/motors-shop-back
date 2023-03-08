import {AppDataSource} from "../../data-source";
import { Comment } from "../../entities/comments.entity";
import { AppError } from "../../errors/appError";

const commentDeleteService = async (id: string) => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const commentSelect = await commentRepository.findOneBy({ id });

  if (!commentSelect) {
    throw new AppError("Comment not found", 404);
  }

  await commentRepository.delete(commentSelect);

  return true;
};

export default commentDeleteService;
