import { Request, Response } from 'express';

import { showProfileUseCase } from './show-profile-factory';

class ShowProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const user = await showProfileUseCase.execute(user_id);

    return response.status(200).json(user);
  }
}

export { ShowProfileController };
