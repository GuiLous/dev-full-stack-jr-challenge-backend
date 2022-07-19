import { IPostsResponseDTO } from '@modules/posts/dtos/IPostsResponseDTO';
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class ShowAllPostsFeedUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_nick_name: string): Promise<IPostsResponseDTO[]> {
    const user = await this.usersRepository.findUserByNickName(user_nick_name);

    if (!user) {
      throw new AppError('User not found!');
    }

    const response = await this.postsRepository.showAllPostsFeed(user.id);

    return response;
  }
}

export { ShowAllPostsFeedUseCase };
