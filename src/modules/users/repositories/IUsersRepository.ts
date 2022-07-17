import { User } from '@entities/User';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersCreateResponseDTO } from '../dtos/IUsersCreateResponseDTO';
import { IUsersFindResponseDTO } from '../dtos/IUsersFindResponseDTO';

interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<IUsersCreateResponseDTO>;
  findUserById(id: string): Promise<IUsersFindResponseDTO | null>;
  findUserByEmail(email: string): Promise<IUsersFindResponseDTO | null>;
  findUserByEmailShowingPassword(email: string): Promise<User>;
  findUserByNickName(nick_name: string): Promise<IUsersFindResponseDTO | null>;
  checkIfFollowingUser(
    user_id: string,
    user_to_check_if_following_id: string,
  ): Promise<boolean>;
  addUserFollowings(
    user_follower_id: string,
    user_to_follow_id: string,
  ): Promise<IUsersFindResponseDTO | null>;
  addUserFollowers(
    user_follower_id: string,
    user_to_follow_id: string,
  ): Promise<IUsersFindResponseDTO | null>;
  removeUserFollowings(
    user_id: string,
    user_to_remove_id: string,
  ): Promise<IUsersFindResponseDTO | null>;
  removeUserFollowers(
    user_id: string,
    user_to_remove_id: string,
  ): Promise<IUsersFindResponseDTO | null>;
}

export { IUsersRepository };
