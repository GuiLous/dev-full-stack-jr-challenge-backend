import { Comment } from '@entities/Comment';
import { ICommentsRepository } from '@modules/comments/repositories/ICommentsRepository';
import { AppError } from '@shared/errors/AppError';

class UpdateCommentUseCase {
  constructor(private commentsRepository: ICommentsRepository) {}

  async execute(comment_id: string, newContent: string): Promise<Comment> {
    const comment = await this.commentsRepository.findCommentById(comment_id);

    if (!comment) {
      throw new AppError('Comment not found!');
    }

    comment.content = newContent;
    comment.updated_at = new Date();

    const response = await this.commentsRepository.updateComment(comment);

    return response;
  }
}

export { UpdateCommentUseCase };
