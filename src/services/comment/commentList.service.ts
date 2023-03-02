import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comments.entity";

const commentListService = async () => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comments = commentRepository.find();

  return comments;
};

export default commentListService;
