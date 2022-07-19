import { Request, Response } from 'express';

import { updateCommentUseCase } from './update-comment-factory';

class UpdateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { comment_id, newContent } = request.body;

    const comment = await updateCommentUseCase.execute(comment_id, newContent);

    return response.status(204).json(comment);
  }
}

export { UpdateCommentController };
