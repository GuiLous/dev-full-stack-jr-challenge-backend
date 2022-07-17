import { Post } from '@prisma/client';

interface IUserFollowedAndFollowing {
  id: string;
  email: string;
  nick_name: string;
  bio: string;
  Posts: Post[];
}

class User {
  id?: string;
  email: string;
  password: string;
  nick_name: string;
  bio: string;
  followedBy?: IUserFollowedAndFollowing[];
  following?: IUserFollowedAndFollowing[];
  Posts?: Post[];
  created_at?: Date;
  updated_at?: Date;

  private constructor({ email, password, nick_name, bio }: User) {
    return Object.assign(this, {
      email,
      password,
      nick_name,
      bio,
    });
  }

  static create({ email, password, nick_name, bio }: User): User {
    const user = new User({ email, password, nick_name, bio });

    return user;
  }
}

export { User };
