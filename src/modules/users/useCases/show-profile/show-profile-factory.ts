import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';

import { ShowProfileUseCase } from './show-profile-usecase';

const usersRepository = new UsersRepository();
const showProfileUseCase = new ShowProfileUseCase(usersRepository);

export { showProfileUseCase };
