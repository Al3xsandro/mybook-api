import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

import { User } from 'src/modules/users/infra/typeorm/entities/User';

@Entity('books')
export class Book {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  avaliable: boolean;

  @Column()
  year: string;

  @Column()
  category: string;

  @Column({ default: 0 })
  price: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
