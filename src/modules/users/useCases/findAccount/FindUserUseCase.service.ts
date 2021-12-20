/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    const { password, ...rest } = user;

    return rest;
  }
}
