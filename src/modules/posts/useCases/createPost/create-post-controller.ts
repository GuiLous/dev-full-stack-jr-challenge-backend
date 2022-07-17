import { Request, Response } from 'express';

import { createPostUseCase } from './create-post-factory';

class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { content } = request.body;

    const post = await createPostUseCase.execute({ content, user_id });

    return response.status(201).json(post);
  }
}

export { CreatePostController };
