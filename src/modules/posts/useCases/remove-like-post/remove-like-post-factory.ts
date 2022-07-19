import { PostsRepository } from '@modules/posts/infra/prisma/repositories/posts-repository';

import { RemoveLikePostUseCase } from './remove-like-post-usecase';

const postsRepository = new PostsRepository();

const removeLikePostUseCase = new RemoveLikePostUseCase(postsRepository);

export { removeLikePostUseCase };
