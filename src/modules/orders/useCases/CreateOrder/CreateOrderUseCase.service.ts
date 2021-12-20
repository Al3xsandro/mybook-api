import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IBooksRepository } from 'src/modules/books/interface/IBooksRepository';
import { ICreateOrderDTO } from '../../dtos/ICreateOrder.dto';
import { IOrdersRepository } from '../../interfaces/IOrdersRepository';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @Inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  async execute({ book_id, datetime, user_id }: ICreateOrderDTO) {
    const bookExists = await this.booksRepository.findById(book_id);

    if (!bookExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid book id!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = await this.ordersRepository.create({
      book_id,
      user_id,
      datetime,
    });

    return order;
  }
}
