import { IPostsResponseDTO } from '@modules/posts/dtos/IPostsResponseDTO';
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository';
import { AppError } from '@shared/errors/AppError';

class RemoveLikePostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(post_id: string): Promise<IPostsResponseDTO> {
    const post = await this.postsRepository.findPostById(post_id);

    if (!post) {
      throw new AppError('Post not found!');
    }

    post.likes += -1;
    post.updated_at = new Date();

    const response = await this.postsRepository.updatePost(post);

    return response;
  }
}

export { RemoveLikePostUseCase };
