import { Request, Response } from "express";
import commentCreateService from "../../services/comment/commentCreate.service";
import commentListService from "../../services/comment/commentList.service";
import commentUpdateService from "../../services/comment/commentUpdate.service";
import commentDeleteService from "../../services/comment/commentDelete.service";
import commentByAdvertisementIdService from "../../services/comment/commentByAdvertisementId.service";

const commentCreateController = async (req: Request, res: Response) => {
  try {
    const { text, advertisementID } = req.body;
    const userId = req.user.userId;
    const newComment = await commentCreateService(
      text,
      userId,
      advertisementID
    );

    return res.status(201).json(newComment);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

const commentListController = async (req: Request, res: Response) => {
  const comments = await commentListService();

  return res.status(200).json(comments);
};

const commentUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await commentUpdateService(id, text);

    return res.status(200).json(comment);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

const commentDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await commentDeleteService(id);

    return res.status(204).json(comment);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  }
};

const commentByAdvertisementIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const comments = await commentByAdvertisementIdService(id);

  return res.status(200).json(comments);
};

export {
  commentCreateController,
  commentDeleteController,
  commentListController,
  commentUpdateController,
  commentByAdvertisementIdController,
};
