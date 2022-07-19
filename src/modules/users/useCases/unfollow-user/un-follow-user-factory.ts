import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';

import { UnFollowUserUseCase } from './un-follow-user-usecase';

const usersRepository = new UsersRepository();
const unFollowUserUseCase = new UnFollowUserUseCase(usersRepository);

export { unFollowUserUseCase };
