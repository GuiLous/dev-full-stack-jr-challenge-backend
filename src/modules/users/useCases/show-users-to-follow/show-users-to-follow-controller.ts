import { Request, Response } from 'express';

import { showUsersToFollowUseCase } from './show-users-to-follow-factory';

class ShowUsersToFollowController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const users = await showUsersToFollowUseCase.execute(user_id);

    return response.status(200).json(users);
  }
}

export { ShowUsersToFollowController };
