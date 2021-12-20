import { Injectable, Inject } from '@nestjs/common';
import { IOrdersRepository } from '../../interfaces/IOrdersRepository';

@Injectable()
export class FindOrdersToApproveUseCase {
  constructor(
    @Inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(user_id: string) {
    const approveOrder = await this.ordersRepository.findAllOrdersToApprove(
      user_id,
    );

    return approveOrder;
  }
}
