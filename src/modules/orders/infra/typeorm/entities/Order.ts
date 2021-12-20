import { User } from 'src/modules/users/infra/typeorm/entities/User';

import { v4 as uuidV4 } from 'uuid';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Book } from 'src/modules/books/infra/typeorm/entities/Book';

@Entity('orders')
class Order {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  book_id: string;

  @Column()
  user_id: string;

  @Column({ default: false })
  approved: string;

  @Column()
  datetime: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Order };
