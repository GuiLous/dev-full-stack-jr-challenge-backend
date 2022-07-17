import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/users-repository-in-memory';
// import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/create-user-usecase';
import { FollowUserUseCase } from '../followUser/follow-user-usecase';
import { UnFollowUserUseCase } from './un-follow-user-usecase';

describe('UnFollow User', () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;
  let followUserUseCase: FollowUserUseCase;
  let unFollowUserUseCase: UnFollowUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    followUserUseCase = new FollowUserUseCase(usersRepositoryInMemory);
    unFollowUserUseCase = new UnFollowUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to unfollow an user', async () => {
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

    await followUserUseCase.execute(user01.id, user02.id);

    const response = await unFollowUserUseCase.execute(user01.id, user02.id);

    expect(response.following).toHaveLength(0);
  });
});
