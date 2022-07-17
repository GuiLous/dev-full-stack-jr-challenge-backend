import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/users-repository-in-memory';
import { UsersTokensRepositoryInMemory } from '@modules/users/repositories/in-memory/users-tokens-repositor-in-memory';
import { DayjsDateProvider } from '@shared/providers/date-provider/implementations/DayjsDateProvider';

import { AuthenticateUserUseCase } from '../authenticateUser/authenticate-user-usecase';
import { CreateUserUseCase } from '../createUser/create-user-usecase';
import { RefreshTokenUseCase } from './refresh-token-usecase';

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;

describe('Refresh Token', () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to create a new token with refresh token', async () => {
    const user: ICreateUserDTO = {
      email: 'teste@token.com',
      password: '123',
      nick_name: 'test01',
      bio: 'test bio01',
    };

    await createUserUseCase.execute(user);

    const userToken = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const result = await refreshTokenUseCase.execute(userToken.refresh_token);

    expect(result).toHaveProperty('refresh_token');
  });
});
