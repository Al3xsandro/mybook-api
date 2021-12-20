import { Book } from 'src/modules/books/infra/typeorm/entities/Book';
import { Order } from 'src/modules/orders/infra/typeorm/entities/Order';

import { Role } from '../../../../../shared/infra/http/enum/role.enum';

import { v4 as uuidV4 } from 'uuid';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column({ default: 0 })
  wallet: number;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  cep: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
