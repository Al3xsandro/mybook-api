import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateOrderDTO } from 'src/modules/orders/dtos/ICreateOrder.dto';
import { IOrdersRepository } from 'src/modules/orders/interfaces/IOrdersRepository';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entities/Order';

@Injectable()
export class OrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
  ) {
    this.repository = getRepository(Order);
  }

  async create({
    user_id,
    datetime,
    book_id,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({ user_id, datetime, book_id });

    await this.repository.save(order);

    return order;
  }
}
