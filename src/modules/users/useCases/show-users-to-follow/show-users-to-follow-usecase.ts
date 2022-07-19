import { IUserListResponseDTO } from '@modules/users/dtos/IUserListResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class ShowUsersToFollowUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string): Promise<IUserListResponseDTO[]> {
    const user = await this.usersRepository.findUserById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const response = await this.usersRepository.findUsersToFollow(user_id);
    return response;
  }
}

export { ShowUsersToFollowUseCase };
