import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../typeorm';

import { BooksModule } from '../../../modules/books/books.module';
import { OrdersModule } from '../../../modules/orders/orders.module';
import { UsersModule } from '../../../modules/users/users.module';
import { AuthModule } from '../../../modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UsersModule,
    OrdersModule,
    BooksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
