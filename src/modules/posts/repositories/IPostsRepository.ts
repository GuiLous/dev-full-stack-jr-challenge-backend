import { Post } from '@entities/Post';

import { ICreatePostDTO } from '../dtos/ICreatePostDTO';
import { IPostsResponseDTO } from '../dtos/IPostsResponseDTO';

interface IPostsRepository {
  createPost(data: ICreatePostDTO): Promise<Post>;
  findPostById(id: string): Promise<Post>;
  showAllPostsFeed(user_id: string): Promise<IPostsResponseDTO[]>;
  updatePost(postUpdated: Post): Promise<IPostsResponseDTO>;
}

export { IPostsRepository };
