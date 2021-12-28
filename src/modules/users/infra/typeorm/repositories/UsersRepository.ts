import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUserDTO } from '../../../../../modules/users/dtos/ICreateUser.dto';
import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '../../../interfaces/IUsersRepository';
import { User } from '../entities/User';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRepository = getRepository(User);
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        cpf,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['books'],
    });

    return user;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);

    await this.userRepository.save(user);

    return user;
  }
}
