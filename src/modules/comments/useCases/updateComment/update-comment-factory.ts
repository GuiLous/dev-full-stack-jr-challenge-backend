import { CommentsRepository } from '@modules/comments/infra/prisma/repositories/CommentsRepository';

import { UpdateCommentUseCase } from './update-comment-usecase';

const commentsRepository = new CommentsRepository();

const updateCommentUseCase = new UpdateCommentUseCase(commentsRepository);

export { updateCommentUseCase };
