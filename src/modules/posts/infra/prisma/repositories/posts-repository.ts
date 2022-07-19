import { Post } from '@entities/Post';
import { ICreatePostDTO } from '@modules/posts/dtos/ICreatePostDTO';
import { IPostsResponseDTO } from '@modules/posts/dtos/IPostsResponseDTO';
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@shared/infra/database/prismaClient';

class PostsRepository implements IPostsRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  async createPost({ content, user_id }: ICreatePostDTO): Promise<Post> {
    const response = await this.repository.post.create({
      data: {
        content,
        user_id,
      },
    });

    return response;
  }

  async findPostById(id: string): Promise<Post> {
    const response = await this.repository.post.findFirst({
      where: {
        id,
      },
    });

    return response;
  }

  async showAllPostsFeed(user_id: string): Promise<IPostsResponseDTO[]> {
    const response = await this.repository.post.findMany({
      where: {
        OR: [
          {
            user: {
              followedBy: {
                some: {
                  id: user_id,
                },
              },
            },
          },
          {
            user_id,
          },
        ],
      },
      include: {
        Comments: {
          include: {
            user: {
              select: {
                nick_name: true,
              },
            },
          },
        },
        user: {
          select: {
            nick_name: true,
            bio: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return response;
  }

  async updatePost(postUpdated: Post): Promise<IPostsResponseDTO> {
    const response = await this.repository.post.update({
      where: {
        id: postUpdated.id,
      },
      data: postUpdated,
      include: {
        Comments: true,
      },
    });

    return response;
  }
}

export { PostsRepository };
