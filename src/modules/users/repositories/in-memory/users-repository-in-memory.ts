import { v4 as uuidV4 } from 'uuid';

import { User } from '@entities/User';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersCreateResponseDTO } from '@modules/users/dtos/IUsersCreateResponseDTO';
import { IUsersFindResponseDTO } from '@modules/users/dtos/IUsersFindResponseDTO';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async createUser({
    email,
    password,
    nick_name,
    bio,
  }: ICreateUserDTO): Promise<IUsersCreateResponseDTO> {
    const user: User = {
      id: uuidV4(),
      email,
      password,
      nick_name,
      bio,
      followedBy: [],
      following: [],
      Posts: [],
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return {
      id: user.id,
      email: user.email,
      nick_name: user.nick_name,
      bio: user.bio,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async findUserById(id: string): Promise<IUsersFindResponseDTO> {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      nick_name: user.nick_name,
      bio: user.bio,
      followedBy: user.followedBy,
      following: user.following,
      Posts: user.Posts,
    };
  }

  async findUserByEmail(email: string): Promise<IUsersFindResponseDTO> {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      nick_name: user.nick_name,
      bio: user.bio,
      followedBy: user.followedBy,
      following: user.following,
      Posts: user.Posts,
    };
  }

  async findUserByNickName(nick_name: string): Promise<IUsersFindResponseDTO> {
    const user = this.users.find(user => user.nick_name === nick_name);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      nick_name: user.nick_name,
      bio: user.bio,
      followedBy: user.followedBy,
      following: user.following,
      Posts: user.Posts,
    };
  }

  async findUserByEmailShowingPassword(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async checkIfFollowingUser(
    user_id: string,
    user_to_check_if_following_id: string,
  ): Promise<boolean> {
    const user = this.users.find(user => user.id === user_id);

    const isFollowing = user.following.find(
      user => user.id === user_to_check_if_following_id,
    );

    if (isFollowing) {
      return true;
    }

    return false;
  }

  async addUserFollowings(
    user_follower_id: string,
    user_to_follow_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const userFollower = this.users.find(user => user.id === user_follower_id);
    const userToFollow = this.users.find(user => user.id === user_to_follow_id);

    const following = {
      id: userToFollow.id,
      email: userToFollow.email,
      nick_name: userToFollow.nick_name,
      bio: userToFollow.bio,
      Posts: userToFollow.Posts,
    };

    userFollower.following.push(following);

    return {
      id: userFollower.id,
      email: userFollower.email,
      nick_name: userFollower.nick_name,
      bio: userFollower.bio,
      followedBy: userFollower.followedBy,
      following: userFollower.following,
      Posts: userFollower.Posts,
    };
  }

  async addUserFollowers(
    user_follower_id: string,
    user_to_follow_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const userFollower = this.users.find(user => user.id === user_follower_id);
    const userToFollow = this.users.find(user => user.id === user_to_follow_id);

    const follower = {
      id: userFollower.id,
      email: userFollower.email,
      nick_name: userFollower.nick_name,
      bio: userFollower.bio,
      Posts: userFollower.Posts,
    };

    userToFollow.followedBy.push(follower);

    return {
      id: userToFollow.id,
      email: userToFollow.email,
      nick_name: userToFollow.nick_name,
      bio: userToFollow.bio,
      followedBy: userToFollow.followedBy,
      following: userToFollow.following,
      Posts: userToFollow.Posts,
    };
  }

  async removeUserFollowings(
    user_id: string,
    user_to_remove_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const user = this.users.find(user => user.id === user_id);

    const following = user.following.filter(
      user => user.id !== user_to_remove_id,
    );

    user.following = following;

    return {
      id: user.id,
      email: user.email,
      nick_name: user.nick_name,
      bio: user.bio,
      followedBy: user.followedBy,
      following: user.following,
      Posts: user.Posts,
    };
  }

  async removeUserFollowers(
    user_id: string,
    user_to_remove_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const user = this.users.find(user => user.id === user_id);

    const followedBy = user.followedBy.filter(
      user => user.id !== user_to_remove_id,
    );

    user.followedBy = followedBy;

    return {
      id: user.id,
      email: user.email,
      nick_name: user.nick_name,
      bio: user.bio,
      followedBy: user.followedBy,
      following: user.following,
      Posts: user.Posts,
    };
  }
}

export { UsersRepositoryInMemory };
