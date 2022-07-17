import { Comment } from '@entities/Comment';
import { ICreateCommentDTO } from '@modules/comments/dtos/ICreateCommentDTO';
import { ICommentsRepository } from '@modules/comments/repositories/ICommentsRepository';
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class CreateCommentUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
    private commentsRepository: ICommentsRepository,
  ) {}

  async execute({
    content,
    user_id,
    post_id,
  }: ICreateCommentDTO): Promise<Comment> {
    const user = await this.usersRepository.findUserById(user_id);
    const post = await this.postsRepository.findPostById(post_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    if (!post) {
      throw new AppError('Post not found!');
    }

    const newComment = Comment.create({
      content,
      user_id,
      post_id,
    });

    const response = await this.commentsRepository.createComment(newComment);

    return response;
  }
}

export { CreateCommentUseCase };
