import { IPostsResponseDTO } from '@modules/posts/dtos/IPostsResponseDTO';
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository';
import { AppError } from '@shared/errors/AppError';

class EditPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(
    user_id: string,
    post_id: string,
    newContent: string,
  ): Promise<IPostsResponseDTO> {
    const post = await this.postsRepository.findPostById(post_id);

    if (!post) {
      throw new AppError('Post not found!');
    }

    if (user_id !== post.user_id) {
      throw new AppError('Not authorized!');
    }

    post.content = newContent;
    post.updated_at = new Date();

    const response = await this.postsRepository.updatePost(post);

    return response;
  }
}

export { EditPostUseCase };
