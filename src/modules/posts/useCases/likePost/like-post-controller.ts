import { Request, Response } from 'express';

import { likePostUseCase } from './like-post-factory';

class LikePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.body;

    const postUpdated = await likePostUseCase.execute(post_id);

    return response.status(204).json(postUpdated);
  }
}

export { LikePostController };
