import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateBookDTO } from '../../../../../modules/books/dtos/ICreateBook.dto';
import { getRepository, ILike, Like, Repository } from 'typeorm';
import { IBooksRepository } from '../../../../../modules/books/interface/IBooksRepository';
import { Book } from '../entities/Book';

@Injectable()
export class BooksRepository implements IBooksRepository {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {
    this.booksRepository = getRepository(Book);
  }

  async findById(id: string): Promise<Book> {
    return await this.booksRepository.findOne(id);
  }

  async findByCep(cep: string): Promise<Book[]> {
    const books = await this.booksRepository.find({
      where: {
        user: {
          cep: Like(`%${String(cep)}%`),
        },
      },
      relations: ['user'],
    });

    return books;
  }

  async findByTitle(title: string): Promise<Book[]> {
    const books = await this.booksRepository.find({
      where: {
        name: ILike(`%${String(title)}%`),
      },
      relations: ['user'],
    });

    return books;
  }

  async findByCity(city: string): Promise<Book[]> {
    const books = await this.booksRepository.find({
      where: {
        user: {
          city: Like(`%${String(city)}%`),
        },
      },
      relations: ['user'],
    });

    return books;
  }

  async findAll(): Promise<Book[]> {
    const books = await this.booksRepository.find({
      cache: 60000,
      order: {
        price: 'ASC',
      },
    });

    return books;
  }

  async create(data: ICreateBookDTO): Promise<Book> {
    const book = this.booksRepository.create(data);

    await this.booksRepository.save(book);

    return book;
  }
}
