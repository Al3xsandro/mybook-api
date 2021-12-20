import { ICreateOrderDTO } from '../dtos/ICreateOrder.dto';
import { Order } from '../infra/typeorm/entities/Order';

export interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
}
