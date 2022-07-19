import { Request, Response } from 'express';

import { showAllPostsFeedUseCase } from './show-all-posts-feed-factory';

class ShowAllPostsFeedController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_nick_name } = request.params;

    const post = await showAllPostsFeedUseCase.execute(user_nick_name);

    return response.status(200).json(post);
  }
}

export { ShowAllPostsFeedController };
