import { PostsRepository } from '@modules/posts/infra/prisma/repositories/posts-repository';

import { LikePostUseCase } from './like-post-usecase';

const postsRepository = new PostsRepository();

const likePostUseCase = new LikePostUseCase(postsRepository);

export { likePostUseCase };
