import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/create-user-controller';
import { FollowUserController } from '@modules/users/useCases/followUser/follow-user-controller';
import { ShowProfileController } from '@modules/users/useCases/showProfile/show-profile-controller';
import { UnFollowUserController } from '@modules/users/useCases/unFollowUser/un-follow-user-controller';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const showProfileController = new ShowProfileController();
const followUserController = new FollowUserController();
const unFollowUserController = new UnFollowUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.put('/follow', ensureAuthenticated, followUserController.handle);

usersRoutes.put(
  '/un-follow',
  ensureAuthenticated,
  unFollowUserController.handle,
);

usersRoutes.get(
  '/:nick_name',
  ensureAuthenticated,
  showProfileController.handle,
);

export { usersRoutes };
