import {AppDataSource} from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { Comment } from "../../entities/comments.entity";

const commentByAdvertisementIdService = async (id:string) => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const commentSelect = await commentRepository.find({
    relations: {
        vehicle: true,
    },
    where: {
        vehicle: {
            id: id,
        },
    },
  })
  return commentSelect;
};

export default commentByAdvertisementIdService;
