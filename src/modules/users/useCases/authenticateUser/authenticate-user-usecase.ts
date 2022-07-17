import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import { Users_Token } from '@entities/Users_Token';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/date-provider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    nick_name: string;
  };
  token: string;
  refresh_token: string;
}

class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: IUsersTokensRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserByEmailShowingPassword(
      email,
    );

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const {
      expires_in_refresh_token,
      expires_in_token,
      expires_refresh_token_days,
      secret_refresh_token,
      secret_token,
    } = auth;

    const userToken = await this.usersTokensRepository.findByUserId(user.id);

    if (userToken) {
      await this.usersTokensRepository.deleteById(userToken.id);
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    const userTokenCreate = Users_Token.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    });

    await this.usersTokensRepository.create(userTokenCreate);

    const tokenReturn: IResponse = {
      user: {
        email: user.email,
        nick_name: user.nick_name,
      },
      token,
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
