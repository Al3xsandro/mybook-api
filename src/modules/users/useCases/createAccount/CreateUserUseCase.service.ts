/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ICreateUserDTO } from '../../dtos/ICreateUser.dto';
import { IUsersRepository } from '../../interfaces/IUsersRepository';

import axios from 'axios';

import { hash } from 'bcrypt';

@Injectable()
class CreateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByCpf(data.cpf);

    if (userAlreadyExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already exists!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const validateUserAddress = await axios
      .get<{
        localidade: string;
        uf: string;
        cep: string;
      }>(`https://viacep.com.br/ws/${String(data.cep)}/json/`)
      .then((user) => {
        return Object.assign(data, {
          city: user.data.localidade,
          state: user.data.uf,
          cep: user.data.cep,
        });
      })
      .catch(() => {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Invalid cep!',
          },
          HttpStatus.BAD_REQUEST,
        );
      });

    const passwordHash = await hash(validateUserAddress.password, 8);

    Object.assign(validateUserAddress, {
      password: passwordHash,
    });

    const user = await this.usersRepository.create(validateUserAddress);

    const { password, ...rest } = user;

    return rest;
  }
}

export { CreateUserUseCase };
