import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/users-repository-in-memory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/create-user-usecase';
import { FollowUserUseCase } from './follow-user-usecase';

describe('Follow User', () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;
  let followUserUseCase: FollowUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    followUserUseCase = new FollowUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to follow an user', async () => {
    const user01 = await createUserUseCase.execute({
      email: 'user01@example',
      password: '123',
      nick_name: 'user01',
      bio: 'teste bio01',
    });

    const user02 = await createUserUseCase.execute({
      email: 'user02@example',
      password: '123',
      nick_name: 'user02',
      bio: 'teste bio02',
    });

    const response = await followUserUseCase.execute(user01.id, user02.id);

    expect(response.following).toHaveLength(1);
  });

  it('should NOT be able to follow without user follower', async () => {
    const userToFollow = await createUserUseCase.execute({
      email: 'user03@example',
      password: '123',
      nick_name: 'user03',
      bio: 'teste bio03',
    });

    await expect(
      followUserUseCase.execute('user_not_exists', userToFollow.id),
    ).rejects.toEqual(new AppError('User not found!'));
  });

  it('should NOT be able to follow a non existent user', async () => {
    const userFollower = await createUserUseCase.execute({
      email: 'user04@example',
      password: '123',
      nick_name: 'user04',
      bio: 'teste bio04',
    });

    await expect(
      followUserUseCase.execute(userFollower.id, 'non_existent_user'),
    ).rejects.toEqual(new AppError('User to follow not found!'));
  });
});
