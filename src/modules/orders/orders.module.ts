import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from '../books/books.module';
import { OrdersController } from './infra/order.controller';
import { Order } from './infra/typeorm/entities/Order';
import { OrdersRepository } from './infra/typeorm/repositories/OrdersRepository';
import { ApproveOrderUseCase } from './useCases/ApproveOrder/ApproveOrderUseCase.service';
import { CreateOrderUseCase } from './useCases/CreateOrder/CreateOrderUseCase.service';
import { FindOrdersUseCase } from './useCases/FindAllOrders/FindOrdersUseCase.service';
import { FindOrdersToApproveUseCase } from './useCases/FindOrdersToAprove/FindOrdersToApproveUseCase.service';

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
    {
      provide: 'ApproveOrderUseCase',
      useClass: ApproveOrderUseCase,
    },
    {
      provide: 'FindOrdersToApproveUseCase',
      useClass: FindOrdersToApproveUseCase,
    },
    {
      provide: 'FindOrdersUseCase',
      useClass: FindOrdersUseCase,
    },
  ],
})
export class OrdersModule {}
