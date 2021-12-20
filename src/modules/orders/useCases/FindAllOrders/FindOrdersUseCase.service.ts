import { Injectable, Inject } from '@nestjs/common';
import { IOrdersRepository } from '../../interfaces/IOrdersRepository';

@Injectable()
export class FindOrdersUseCase {
  constructor(
    @Inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute() {
    const orders = await this.ordersRepository.findAllOrders();

    return orders;
  }
}
