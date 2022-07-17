import { IUsersFindResponseDTO } from '@modules/users/dtos/IUsersFindResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class UnFollowUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    user_follower_id: string,
    user_to_unFollow_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const userFollower = await this.usersRepository.findUserById(
      user_follower_id,
    );

    const userToUnFollow = await this.usersRepository.findUserById(
      user_to_unFollow_id,
    );

    if (!userFollower) {
      throw new AppError('User not found!');
    }

    if (!userToUnFollow) {
      throw new AppError('User to unfollow not found!');
    }

    const checkIfFollowing = await this.usersRepository.checkIfFollowingUser(
      user_follower_id,
      user_to_unFollow_id,
    );

    if (!checkIfFollowing) {
      throw new AppError('Already not following this user!');
    }

    const response = await this.usersRepository.removeUserFollowings(
      userFollower.id,
      userToUnFollow.id,
    );

    await this.usersRepository.removeUserFollowers(
      userToUnFollow.id,
      userFollower.id,
    );

    return response;
  }
}

export { UnFollowUserUseCase };
