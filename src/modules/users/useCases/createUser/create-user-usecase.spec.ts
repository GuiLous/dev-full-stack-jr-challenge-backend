import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/users-repository-in-memory';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/create-user-usecase';
import { AppError } from '@shared/errors/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const response = await createUserUseCase.execute({
      email: 'teste@create.com',
      password: '123',
      nick_name: 'teste01',
      bio: 'bio teste01',
    });

    expect(response).toHaveProperty('id');
  });

  it('should NOT be able to create a new user with the same email', async () => {
    await createUserUseCase.execute({
      email: 'teste@gmail.com',
      password: '123',
      nick_name: 'teste02',
      bio: 'bio teste02',
    });

    await expect(
      createUserUseCase.execute({
        email: 'teste@gmail.com',
        password: '321',
        nick_name: 'teste03',
        bio: 'bio teste03',
      }),
    ).rejects.toEqual(new AppError('User already exists!'));
  });

  it('should NOT be able to create a new user with the same nick name', async () => {
    await createUserUseCase.execute({
      email: 'teste04@gmail.com',
      password: '123',
      nick_name: 'teste',
      bio: 'bio teste04',
    });

    await expect(
      createUserUseCase.execute({
        email: 'teste05@gmail.com',
        password: '321',
        nick_name: 'teste',
        bio: 'bio teste05',
      }),
    ).rejects.toEqual(new AppError('User nick name not available!'));
  });
});
