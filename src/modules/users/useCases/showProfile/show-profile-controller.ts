import { Request, Response } from 'express';

import { showProfileUseCase } from './show-profile-factory';

class ShowProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nick_name } = request.params;

    const user = await showProfileUseCase.execute(nick_name);

    return response.status(200).json(user);
  }
}

export { ShowProfileController };
