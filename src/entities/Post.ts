class Post {
  id?: string;
  content: string;
  likes?: number;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;

  private constructor({ content, user_id }: Post) {
    return Object.assign(this, {
      content,
      user_id,
    });
  }

  static create({ content, user_id }: Post): Post {
    const post = new Post({ content, user_id });

    return post;
  }
}

export { Post };
