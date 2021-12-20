import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { compare } from 'bcrypt';
import { IUsersRepository } from 'src/modules/users/interfaces/IUsersRepository';

import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUser.dtos';

import { sign } from 'jsonwebtoken';
import auth from '../../../../config/auth';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ cpf, password }: IAuthenticateUserDTO) {
    const userExists = await this.usersRepository.findByCpf(cpf);

    if (!userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid cpf or password!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordMath = await compare(password, userExists.password);

    if (!passwordMath) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid cpf or password!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = sign(
      {
        roles: userExists.roles,
      },
      auth.secret,
      {
        subject: userExists.id,
        expiresIn: auth.expiresIn,
      },
    );

    return {
      user: {
        id: userExists.id,
        name: userExists.name,
        wallet: userExists.wallet,
        state: userExists.state,
      },
      token,
    };
  }
}
