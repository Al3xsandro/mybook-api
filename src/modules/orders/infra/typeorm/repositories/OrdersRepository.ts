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

  async approveOrder(order_id: string): Promise<Order> {
    await this.repository.update(order_id, {
      approved: 'APPROVED',
    });

    const order = await this.repository.findOne(order_id);

    return order;
  }
  async findOrderById(id: string): Promise<Order> {
    const order = await this.repository.findOne(id);

    return order;
  }
  async findAllOrdersToApprove(user_id: string): Promise<Order[]> {
    const orders = await this.repository.find({
      where: {
        user_id,
        approved: 'PENDING',
      },
    });

    return orders;
  }

  async findAllOrders(): Promise<Order[]> {
    const orders = await this.repository.find();

    return orders;
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
