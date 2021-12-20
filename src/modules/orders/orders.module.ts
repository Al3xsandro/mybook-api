import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';
import { OrdersController } from './infra/order.controller';
import { Order } from './infra/typeorm/entities/Order';
import { OrdersRepository } from './infra/typeorm/repositories/OrdersRepository';
import { CreateOrderUseCase } from './useCases/CreateOrder/CreateOrderUseCase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), BooksModule],
  controllers: [OrdersController],
  providers: [
    {
      provide: 'OrdersRepository',
      useClass: OrdersRepository,
    },
    {
      provide: 'CreateOrderUseCase',
      useClass: CreateOrderUseCase,
    },
  ],
})
export class OrdersModule {}
