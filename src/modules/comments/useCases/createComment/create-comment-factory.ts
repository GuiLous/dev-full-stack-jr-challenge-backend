import { CommentsRepository } from '@modules/comments/infra/prisma/repositories/CommentsRepository';
import { PostsRepository } from '@modules/posts/infra/prisma/repositories/posts-repository';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';

import { CreateCommentUseCase } from './create-comment-usecase';

const usersRepository = new UsersRepository();
const postsRepository = new PostsRepository();
const commentsRepository = new CommentsRepository();

const createCommentUseCase = new CreateCommentUseCase(
  postsRepository,
  usersRepository,
  commentsRepository,
);

export { createCommentUseCase };
