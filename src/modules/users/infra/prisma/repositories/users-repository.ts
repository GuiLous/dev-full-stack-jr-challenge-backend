import { User } from '@entities/User';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersCreateResponseDTO } from '@modules/users/dtos/IUsersCreateResponseDTO';
import { IUsersFindResponseDTO } from '@modules/users/dtos/IUsersFindResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

class UsersRepository implements IUsersRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async createUser({
    email,
    password,
    nick_name,
    bio,
  }: ICreateUserDTO): Promise<IUsersCreateResponseDTO> {
    const response = await this.repository.user.create({
      data: {
        email,
        password,
        nick_name,
        bio,
      },
      select: {
        id: true,
        email: true,
        nick_name: true,
        bio: true,
        created_at: true,
        updated_at: true,
      },
    });

    return response;
  }

  async findUserById(id: string): Promise<IUsersFindResponseDTO> {
    const response = await this.repository.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        nick_name: true,
        bio: true,
        followedBy: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        following: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        Posts: true,
      },
    });

    return response;
  }

  async findUserByEmail(email: string): Promise<IUsersFindResponseDTO> {
    const response = await this.repository.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        email: true,
        nick_name: true,
        bio: true,
        followedBy: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        following: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        Posts: true,
      },
    });

    return response;
  }

  async findUserByNickName(nick_name: string): Promise<IUsersFindResponseDTO> {
    const response = await this.repository.user.findFirst({
      where: {
        nick_name: {
          equals: nick_name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        email: true,
        nick_name: true,
        bio: true,
        followedBy: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        following: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        Posts: {
          select: {
            id: true,
            content: true,
            likes: true,
            user_id: true,
            created_at: true,
            updated_at: true,
            Comments: true,
          },
        },
      },
    });

    return response;
  }

  async findUserByEmailShowingPassword(email: string): Promise<User> {
    const response = await this.repository.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    return response;
  }

  async checkIfFollowingUser(
    user_id: string,
    user_to_check_if_following_id: string,
  ): Promise<boolean> {
    const response = await this.repository.user.findFirst({
      where: {
        id: user_id,
        following: {
          some: {
            id: user_to_check_if_following_id,
          },
        },
      },
    });

    if (response) {
      return true;
    }

    return false;
  }

  async addUserFollowings(
    user_follower_id: string,
    user_to_follow_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const response = await this.repository.user.update({
      where: {
        id: user_follower_id,
      },
      data: {
        following: {
          connect: {
            id: user_to_follow_id,
          },
        },
        updated_at: new Date(),
      },
      select: {
        id: true,
        email: true,
        nick_name: true,
        bio: true,
        followedBy: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        following: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        Posts: true,
      },
    });

    return response;
  }

  async addUserFollowers(
    user_follower_id: string,
    user_to_follow_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const response = await this.repository.user.update({
      where: {
        id: user_to_follow_id,
      },
      data: {
        followedBy: {
          connect: {
            id: user_follower_id,
          },
        },
        updated_at: new Date(),
      },
      select: {
        id: true,
        email: true,
        nick_name: true,
        bio: true,
        followedBy: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        following: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        Posts: true,
      },
    });

    return response;
  }

  async removeUserFollowings(
    user_id: string,
    user_to_remove_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const response = await this.repository.user.update({
      where: {
        id: user_id,
      },
      data: {
        following: {
          disconnect: {
            id: user_to_remove_id,
          },
        },
        updated_at: new Date(),
      },
      select: {
        id: true,
        email: true,
        nick_name: true,
        bio: true,
        followedBy: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        following: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        Posts: true,
      },
    });

    return response;
  }

  async removeUserFollowers(
    user_id: string,
    user_to_remove_id: string,
  ): Promise<IUsersFindResponseDTO> {
    const response = await this.repository.user.update({
      where: {
        id: user_id,
      },
      data: {
        followedBy: {
          disconnect: {
            id: user_to_remove_id,
          },
        },
        updated_at: new Date(),
      },
      select: {
        id: true,
        email: true,
        nick_name: true,
        bio: true,
        followedBy: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        following: {
          select: {
            id: true,
            email: true,
            nick_name: true,
            bio: true,
            Posts: true,
          },
        },
        Posts: true,
      },
    });

    return response;
  }
}

export { UsersRepository };
