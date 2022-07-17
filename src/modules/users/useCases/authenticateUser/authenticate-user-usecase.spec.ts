import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/users-repository-in-memory';
import { UsersTokensRepositoryInMemory } from '@modules/users/repositories/in-memory/users-tokens-repositor-in-memory';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/providers/date-provider/implementations/DayjsDateProvider';

import { CreateUserUseCase } from '../createUser/create-user-usecase';
import { AuthenticateUserUseCase } from './authenticate-user-usecase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      email: 'teste@gmail.com',
      password: '123',
      nick_name: 'teste',
      bio: 'teste bio',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should NOT be able to authenticate a NON existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@gmail.com',
        password: '123321',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should NOT be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      email: 'teste@gmail.com',
      password: '123',
      nick_name: 'teste02',
      bio: 'teste02',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: 'teste@gmail.com',
        password: 'false',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
