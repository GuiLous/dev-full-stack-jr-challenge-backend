import { Comment } from '@prisma/client';

interface IPostsResponseDTO {
  id: string;
  content: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
  Comments: Comment[];
}

export { IPostsResponseDTO };
