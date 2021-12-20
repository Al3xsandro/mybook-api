/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { IFindBooksDTO } from '../../dtos/IFindBooks.dto';

import { IBooksRepository } from '../../interface/IBooksRepository';

@Injectable()
export class FindAllBooksUseCase {
  constructor(
    @Inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  async execute(params: IFindBooksDTO) {
    if (params.city) {
      const books = await this.booksRepository.findByCity(params.city);

      const rest = books.map((book) => {
        const { user, ...rest } = book;

        return rest;
      });

      return rest;
    }

    if (params.cep) {
      const books = await this.booksRepository.findByCep(params.cep);

      const rest = books.map((book) => {
        const { user, ...rest } = book;

        return rest;
      });

      return rest;
    }

    if (params.title) {
      const books = await this.booksRepository.findByTitle(params.title);

      const rest = books.map((book) => {
        const { user, ...rest } = book;

        return rest;
      });

      return rest;
    }

    const books = await this.booksRepository.findAll();

    return books;
  }
}
