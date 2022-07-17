import { Request, Response } from 'express';

import { createUserUseCase } from './create-user-factory';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, nick_name, bio } = request.body;

    const user = await createUserUseCase.execute({
      email,
      password,
      nick_name,
      bio,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
