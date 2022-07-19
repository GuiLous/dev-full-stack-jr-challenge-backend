import { Router } from 'express';

import { CreatePostController } from '@modules/posts/useCases/create-post/create-post-controller';
import { EditPostController } from '@modules/posts/useCases/edit-post/edit-post-controller';
import { LikePostController } from '@modules/posts/useCases/like-post/like-post-controller';
import { RemoveLikePostController } from '@modules/posts/useCases/remove-like-post/remove-like-post-controller';
import { ShowAllPostsFeedController } from '@modules/posts/useCases/show-all-posts-feed/show-all-posts-feed-controler';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const postsRoutes = Router();

const createPostController = new CreatePostController();
const likePostController = new LikePostController();
const removeLikePostController = new RemoveLikePostController();
const showAllPostsFeedController = new ShowAllPostsFeedController();
const editPostController = new EditPostController();

postsRoutes.post('/', ensureAuthenticated, createPostController.handle);

postsRoutes.put('/like-post', ensureAuthenticated, likePostController.handle);

postsRoutes.put(
  '/remove-like-post',
  ensureAuthenticated,
  removeLikePostController.handle,
);

postsRoutes.put('/edit-post', ensureAuthenticated, editPostController.handle);

postsRoutes.get(
  '/:user_nick_name/feed',
  ensureAuthenticated,
  showAllPostsFeedController.handle,
);

export { postsRoutes };
