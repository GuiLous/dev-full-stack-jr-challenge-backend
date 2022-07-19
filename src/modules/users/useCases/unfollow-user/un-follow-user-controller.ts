import { Request, Response } from 'express';

import { unFollowUserUseCase } from './un-follow-user-factory';

class UnFollowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_follower_id } = request.user;
    const { user_to_unFollow_id } = request.body;

    const user = await unFollowUserUseCase.execute(
      user_follower_id,
      user_to_unFollow_id,
    );

    return response.status(204).json(user);
  }
}

export { UnFollowUserController };
