class Comment {
  id?: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at?: Date;
  updated_at?: Date;

  private constructor({ content, user_id, post_id }: Comment) {
    return Object.assign(this, {
      content,
      user_id,
      post_id,
    });
  }

  static create({ content, user_id, post_id }: Comment): Comment {
    const comment = new Comment({ content, user_id, post_id });

    return comment;
  }
}

export { Comment };
