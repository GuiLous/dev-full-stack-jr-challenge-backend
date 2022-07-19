import { Request, Response } from 'express';

import { removeLikePostUseCase } from './remove-like-post-factory';

class RemoveLikePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.body;

    const postUpdated = await removeLikePostUseCase.execute(post_id);

    return response.status(204).json(postUpdated);
  }
}

export { RemoveLikePostController };
