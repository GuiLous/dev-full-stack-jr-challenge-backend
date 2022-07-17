import { IUsersFindResponseDTO } from '@modules/users/dtos/IUsersFindResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class ShowProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(nick_name: string): Promise<IUsersFindResponseDTO> {
    const userByNickName = await this.usersRepository.findUserByNickName(
      nick_name,
    );

    if (!userByNickName) {
      throw new AppError('User not found!');
    }

    return userByNickName;
  }
}

export { ShowProfileUseCase };
