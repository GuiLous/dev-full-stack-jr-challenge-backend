import { Request, Response } from 'express';

import { refreshTokenUseCase } from './refresh-token-factory';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refresh_token =
      request.body.refresh_token ||
      request.headers['x-access-refresh_token'] ||
      request.query.refresh_token;

    const newTokenAndRefreshToken = await refreshTokenUseCase.execute(
      refresh_token,
    );

    return response.status(200).json(newTokenAndRefreshToken);
  }
}

export { RefreshTokenController };
