import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/create-user/create-user-controller';
import { FollowUserController } from '@modules/users/useCases/follow-user/follow-user-controller';
import { ShowProfileController } from '@modules/users/useCases/show-profile/show-profile-controller';
import { ShowUsersToFollowController } from '@modules/users/useCases/show-users-to-follow/show-users-to-follow-controller';
import { UnFollowUserController } from '@modules/users/useCases/unfollow-user/un-follow-user-controller';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const showProfileController = new ShowProfileController();
const followUserController = new FollowUserController();
const unFollowUserController = new UnFollowUserController();
const showUsersToFollowController = new ShowUsersToFollowController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get('/profile', ensureAuthenticated, showProfileController.handle);

usersRoutes.get(
  '/list-users-to-follow',
  ensureAuthenticated,
  showUsersToFollowController.handle,
);

usersRoutes.put('/follow', ensureAuthenticated, followUserController.handle);

usersRoutes.put(
  '/un-follow',
  ensureAuthenticated,
  unFollowUserController.handle,
);

export { usersRoutes };
