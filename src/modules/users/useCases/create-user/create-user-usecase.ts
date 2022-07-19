import { hash } from 'bcrypt';

import { User } from '@entities/User';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersCreateResponseDTO } from '@modules/users/dtos/IUsersCreateResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
    nick_name,
    bio,
  }: ICreateUserDTO): Promise<IUsersCreateResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findUserByEmail(email);

    const nickNameAlreadyExists = await this.usersRepository.findUserByNickName(
      nick_name,
    );

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    if (nickNameAlreadyExists) {
      throw new AppError('User nick name not available!');
    }

    const passwordHashed = await hash(password, 8);

    const newUser = User.create({
      email,
      password: passwordHashed,
      nick_name,
      bio,
    });

    const response = await this.usersRepository.createUser(newUser);

    return response;
  }
}

export { CreateUserUseCase };
