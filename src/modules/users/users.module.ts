import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/typeorm/entities/User';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';

import { UsersController } from './infra/users.controller';
import { CreateUserUseCase } from './useCases/createAccount/CreateUserUseCase.service';
import { FindUserUseCase } from './useCases/findAccount/FindUserUseCase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'CreateUserUseCase',
      useClass: CreateUserUseCase,
    },
    {
      provide: 'FindUserUseCase',
      useClass: FindUserUseCase,
    },
  ],
  controllers: [UsersController],
  exports: [
    TypeOrmModule,
    {
      provide: 'UsersRepository',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
