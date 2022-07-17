class Users_Token {
  id?: string;
  refresh_token: string;
  user_id: string;
  expires_date: Date;
  created_at?: Date;

  private constructor({ user_id, refresh_token, expires_date }: Users_Token) {
    return Object.assign(this, {
      user_id,
      expires_date,
      refresh_token,
    });
  }

  static create({
    user_id,
    refresh_token,
    expires_date,
  }: Users_Token): Users_Token {
    const users_token = new Users_Token({
      user_id,
      refresh_token,
      expires_date,
    });

    return users_token;
  }
}

export { Users_Token };
