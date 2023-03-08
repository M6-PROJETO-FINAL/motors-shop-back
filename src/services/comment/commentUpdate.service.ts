import {AppDataSource} from "../../data-source";
import { AppError } from "../../errors/appError";
import { Comment } from "../../entities/comments.entity";

const commentUpdateService = async (idComment: string, text: any) => {
  if (!text) {
    throw new AppError("Text is necessary to update comment", 404);
  }

  const commentRepository = AppDataSource.getRepository(Comment);
  const commentSelect = await commentRepository.findOneBy({ id: idComment });

  if (!commentSelect) {
    throw new AppError("Comment is not found", 404);
  }

  await commentRepository.update(commentSelect.id, { text: text });

  const commentUpdate = await commentRepository.findOneBy({ id: idComment });

  return commentUpdate;
};

export default commentUpdateService;
