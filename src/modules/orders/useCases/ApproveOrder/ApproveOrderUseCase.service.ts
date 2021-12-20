import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { IOrdersRepository } from '../../interfaces/IOrdersRepository';

@Injectable()
export class ApproveOrderUseCase {
  constructor(
    @Inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(id: string, order_id: string) {
    const orderExists = await this.ordersRepository.findOrderById(order_id);

    if (!orderExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid order id!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (orderExists.user_id != id) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'You cannot to update this order',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (orderExists.approved === 'APPROVED') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This order has already been approved!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const approveOrder = await this.ordersRepository.approveOrder(order_id);

    return approveOrder;
  }
}
