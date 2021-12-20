import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

import { BooksController } from './infra/books.controller';
import { Book } from './infra/typeorm/entities/Book';

import { BooksRepository } from './infra/typeorm/repositories/BooksRepository';
import { CreateBookUseCase } from './useCases/CreateBookUseCase/CreateBookUseCase.service';
import { FindAllBooksUseCase } from './useCases/FindAllBooks/FindAllBooksUseCase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule],
  providers: [
    {
      provide: 'BooksRepository',
      useClass: BooksRepository,
    },
    {
      provide: 'CreateBookUseCase',
      useClass: CreateBookUseCase,
    },
    {
      provide: 'FindAllBooksUseCase',
      useClass: FindAllBooksUseCase,
    },
  ],
  controllers: [BooksController],
  exports: [
    TypeOrmModule,
    {
      provide: 'BooksRepository',
      useClass: BooksRepository,
    },
  ],
})
export class BooksModule {}
