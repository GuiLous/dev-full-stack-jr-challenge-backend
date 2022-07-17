import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/authenticate-user-controller';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/refresh-token-controller';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
