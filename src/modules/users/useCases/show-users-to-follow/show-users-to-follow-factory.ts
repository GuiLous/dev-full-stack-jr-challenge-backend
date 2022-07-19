import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';

import { ShowUsersToFollowUseCase } from './show-users-to-follow-usecase';

const usersRepository = new UsersRepository();
const showUsersToFollowUseCase = new ShowUsersToFollowUseCase(usersRepository);

export { showUsersToFollowUseCase };
