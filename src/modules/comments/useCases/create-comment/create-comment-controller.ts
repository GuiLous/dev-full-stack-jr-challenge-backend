import { Request, Response } from 'express';

import { createCommentUseCase } from './create-comment-factory';

class CreateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { content, post_id } = request.body;

    const comment = await createCommentUseCase.execute({
      content,
      user_id,
      post_id,
    });

    return response.status(201).json(comment);
  }
}

export { CreateCommentController };
