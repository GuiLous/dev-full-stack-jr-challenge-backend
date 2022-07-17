import { PostsRepository } from '@modules/posts/infra/prisma/repositories/posts-repository';
import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';

import { ShowAllPostsFeedUseCase } from './show-all-posts-feed-usecase';

const usersRepository = new UsersRepository();
const postsRepository = new PostsRepository();

const showAllPostsFeedUseCase = new ShowAllPostsFeedUseCase(
  postsRepository,
  usersRepository,
);

export { showAllPostsFeedUseCase };
