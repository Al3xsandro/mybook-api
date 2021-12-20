import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Book } from '../../../modules/books/infra/typeorm/entities/Book';
import { Order } from '../../../modules/orders/infra/typeorm/entities/Order';
import { User } from '../../../modules/users/infra/typeorm/entities/User';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost' || process.env.HOST,
  port: 5432,
  username: 'docker' || process.env.USERNAME,
  password: 'docker' || process.env.PASSWORD,
  database: 'mybooks' || process.env.USERNAME,
  entities: [User, Order, Book],
  autoLoadEntities: true,
  synchronize: true,
};
