import { Request, Response } from 'express';

import { editPostUseCase } from './edit-post-factory';

class EditPostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { post_id, newContent } = request.body;
    const { id: user_id } = request.user;

    const postUpdated = await editPostUseCase.execute(
      user_id,
      post_id,
      newContent,
    );

    return response.status(204).json(postUpdated);
  }
}

export { EditPostController };
