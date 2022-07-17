import { Post } from '@prisma/client';

interface IUserFollowedAndFollowingResponse {
  id: string;
  email: string;
  nick_name: string;
  bio: string;
  Posts: Post[];
}

interface IUsersFindResponseDTO {
  id: string;
  email: string;
  nick_name: string;
  bio: string;
  followedBy: IUserFollowedAndFollowingResponse[];
  following: IUserFollowedAndFollowingResponse[];
  Posts: Post[];
}

export { IUsersFindResponseDTO };
