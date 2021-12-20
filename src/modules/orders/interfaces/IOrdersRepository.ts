import { ICreateOrderDTO } from '../dtos/ICreateOrder.dto';
import { Order } from '../infra/typeorm/entities/Order';

export interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  findOrderById(order_id: string): Promise<Order>;
  findAllOrdersToApprove(user_id: string): Promise<Order[]>;
  approveOrder(order_id: string): Promise<Order>;
  findAllOrders(): Promise<Order[]>;
}
