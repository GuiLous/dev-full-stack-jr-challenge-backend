import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';

import { FollowUserUseCase } from './follow-user-usecase';

const usersRepository = new UsersRepository();
const followUserUseCase = new FollowUserUseCase(usersRepository);

export { followUserUseCase };
