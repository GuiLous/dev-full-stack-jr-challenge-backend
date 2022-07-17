import { Post } from '@entities/Post';
import { ICreatePostDTO } from '@modules/posts/dtos/ICreatePostDTO';
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class CreatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ content, user_id }: ICreatePostDTO): Promise<Post> {
    const user = await this.usersRepository.findUserById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const newPost = Post.create({
      content,
      user_id,
    });

    const response = await this.postsRepository.createPost(newPost);

    return response;
  }
}

export { CreatePostUseCase };
