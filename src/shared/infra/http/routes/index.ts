import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { commentsRoutes } from './comments.routes';
import { postsRoutes } from './posts.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);
router.use('/comments', commentsRoutes);
router.use('/posts', postsRoutes);
router.use('/users', usersRoutes);

export { router };
