import { Request, Response } from 'express';

import { followUserUseCase } from './follow-user-factory';

class FollowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_follower_id } = request.user;
    const { user_to_follow_id } = request.body;

    const user = await followUserUseCase.execute(
      user_follower_id,
      user_to_follow_id,
    );

    return response.status(204).json(user);
  }
}

export { FollowUserController };
