import { UsersTokensRepository } from '@modules/users/infra/prisma/repositories/users-tokens-repository';
import { DayjsDateProvider } from '@shared/providers/date-provider/implementations/DayjsDateProvider';

import { RefreshTokenUseCase } from './refresh-token-usecase';

const dateProvider = new DayjsDateProvider();

const usersTokensRepository = new UsersTokensRepository();

const refreshTokenUseCase = new RefreshTokenUseCase(
  usersTokensRepository,
  dateProvider,
);

export { refreshTokenUseCase };
