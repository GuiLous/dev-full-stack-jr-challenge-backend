import { sign, verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/date-provider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

class RefreshTokenUseCase {
  constructor(
    private usersTokensRepository: IUsersTokensRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(
      refresh_token,
      auth.secret_refresh_token,
    ) as IPayload;

    const user_id = sub;

    const user_token =
      await this.usersTokensRepository.findByUserAndRefreshToken(
        user_id,
        refresh_token,
      );

    if (!user_token) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(user_token.id);

    const newRefreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token: newRefreshToken,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token: newRefreshToken,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
