import { PostsRepository } from '@modules/posts/infra/prisma/repositories/posts-repository';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';

import { CreatePostUseCase } from './create-post-usecase';

const usersRepository = new UsersRepository();
const postsRepository = new PostsRepository();

const createPostUseCase = new CreatePostUseCase(
  postsRepository,
  usersRepository,
);

export { createPostUseCase };
