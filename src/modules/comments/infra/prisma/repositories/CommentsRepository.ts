import { ICreateCommentDTO } from '@modules/comments/dtos/ICreateCommentDTO';
import { ICommentsRepository } from '@modules/comments/repositories/ICommentsRepository';
import { Comment, PrismaClient } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

class CommentsRepository implements ICommentsRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async createComment({
    content,
    post_id,
    user_id,
  }: ICreateCommentDTO): Promise<Comment> {
    const response = await this.repository.comment.create({
      data: {
        content,
        user_id,
        post_id,
      },
    });

    return response;
  }

  async findCommentById(comment_id: string): Promise<Comment> {
    const response = await this.repository.comment.findFirst({
      where: {
        id: comment_id,
      },
    });

    return response;
  }

  async updateComment(commentUpdated: Comment): Promise<Comment> {
    const response = await this.repository.comment.update({
      where: {
        id: commentUpdated.id,
      },
      data: commentUpdated,
    });

    return response;
  }
}

export { CommentsRepository };
