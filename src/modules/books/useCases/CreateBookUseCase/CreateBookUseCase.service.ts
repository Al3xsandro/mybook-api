import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { IUsersRepository } from '../../../users/interfaces/IUsersRepository';
import { ICreateBookDTO } from '../../dtos/ICreateBook.dto';

import { IBooksRepository } from '../../interfaces/IBooksRepository';

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject('BooksRepository')
    private booksRepository: IBooksRepository,
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateBookDTO) {
    const userExists = await this.usersRepository.findById(data.user_id);

    if (!userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user id!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const book = await this.booksRepository.create(data);

    return book;
  }
}
