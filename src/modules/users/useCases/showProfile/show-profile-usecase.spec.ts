import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/users-repository-in-memory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/create-user-usecase';
import { ShowProfileUseCase } from './show-profile-usecase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let showProfileUseCase: ShowProfileUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Show Profile', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showProfileUseCase = new ShowProfileUseCase(usersRepositoryInMemory);
  });

  it('should be able to show a user profile', async () => {
    const user = await createUserUseCase.execute({
      email: 'teste@create.com',
      password: '123',
      nick_name: 'teste',
      bio: 'teste',
    });

    const { nick_name } = user;

    const response = await showProfileUseCase.execute(nick_name);

    expect(response).toHaveProperty('id');
  });

  it('should NOT be able to show a non existent user profile', async () => {
    await expect(showProfileUseCase.execute('test_not_exists')).rejects.toEqual(
      new AppError('User not found!'),
    );
  });
});
