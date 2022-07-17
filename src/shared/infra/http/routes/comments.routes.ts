import { Router } from 'express';

import { CreateCommentController } from '@modules/comments/useCases/createComment/create-comment-controller';
import { UpdateCommentController } from '@modules/comments/useCases/updateComment/update-comment-controller';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const commentsRoutes = Router();

const createCommentController = new CreateCommentController();
const updateCommentController = new UpdateCommentController();

commentsRoutes.post('/', ensureAuthenticated, createCommentController.handle);

commentsRoutes.put(
  '/update-comment',
  ensureAuthenticated,
  updateCommentController.handle,
);

export { commentsRoutes };
