import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticate-user/authenticate-user-controller';
import { RefreshTokenController } from '@modules/users/useCases/refresh-token/refresh-token-controller';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
