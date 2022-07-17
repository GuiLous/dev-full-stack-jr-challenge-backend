import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';

import { CreateUserUseCase } from './create-user-usecase';

const usersRepository = new UsersRepository();
const createUserUseCase = new CreateUserUseCase(usersRepository);

export { createUserUseCase };
