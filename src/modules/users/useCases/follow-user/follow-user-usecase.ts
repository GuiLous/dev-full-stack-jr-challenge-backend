import { IUsersFindResponseDTO } from '@modules/users/dtos/IUsersFindResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class FollowUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    user_follower_id: string,
    user_to_follow_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const userFollower = await this.usersRepository.findUserById(
      user_follower_id,
    );

    const userToFollow = await this.usersRepository.findUserById(
      user_to_follow_id,
    );

    if (!userFollower) {
      throw new AppError('User not found!');
    }

    if (!userToFollow) {
      throw new AppError('User to follow not found!');
    }

    const checkIfAlreadyFollowing =
      await this.usersRepository.checkIfFollowingUser(
        user_follower_id,
        user_to_follow_id,
      );

    if (checkIfAlreadyFollowing) {
      throw new AppError('Already following this user!');
    }

    const response = await this.usersRepository.addUserFollowings(
      userFollower.id,
      userToFollow.id,
    );

    await this.usersRepository.addUserFollowers(
      userFollower.id,
      userToFollow.id,
    );

    return response;
  }
}

export { FollowUserUseCase };
