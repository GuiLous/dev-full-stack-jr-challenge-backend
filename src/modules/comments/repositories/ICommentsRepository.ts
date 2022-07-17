import { Comment } from '@prisma/client';

import { ICreateCommentDTO } from '../dtos/ICreateCommentDTO';

interface ICommentsRepository {
  createComment(data: ICreateCommentDTO): Promise<Comment>;
  findCommentById(comment_id: string): Promise<Comment>;
  updateComment(commentUpdated: Comment): Promise<Comment>;
}

export { ICommentsRepository };
