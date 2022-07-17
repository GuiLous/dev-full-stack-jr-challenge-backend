import { PostsRepository } from '@modules/posts/infra/prisma/repositories/posts-repository';

import { EditPostUseCase } from './edit-post-usecase';

const postsRepository = new PostsRepository();

const editPostUseCase = new EditPostUseCase(postsRepository);

export { editPostUseCase };
