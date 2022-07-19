import { UsersRepository } from '@modules/users/infra/prisma/repositories/users-repository';
import { UsersTokensRepository } from '@modules/users/infra/prisma/repositories/users-tokens-repository';
import { DayjsDateProvider } from '@shared/providers/date-provider/implementations/DayjsDateProvider';

import { AuthenticateUserUseCase } from './authenticate-user-usecase';

const usersRepository = new UsersRepository();

const dateProvider = new DayjsDateProvider();

const usersTokensRepository = new UsersTokensRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  usersRepository,
  usersTokensRepository,
  dateProvider,
);

export { authenticateUserUseCase };
