import { IUsersFindResponseDTO } from '@modules/users/dtos/IUsersFindResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class ShowProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: string): Promise<IUsersFindResponseDTO> {
    const user = await this.usersRepository.findUserById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    return user;
  }
}

export { ShowProfileUseCase };
