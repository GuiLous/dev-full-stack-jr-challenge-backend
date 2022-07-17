import { Post } from '@prisma/client';

interface IUpdateUserRequestDTO {
  id: string;
  email: string;
  nick_name: string;
  bio: string;
  Posts: Post[];
}

export { IUpdateUserRequestDTO };
