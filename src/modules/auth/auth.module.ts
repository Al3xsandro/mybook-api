import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './infra/strategies/jwt.strategy';

import { AuthenticateUserUseCase } from './useCases/AuthenticateUser/AuthenticateUserUseCase.service';
import { AuthController } from './infra/auth.controller';

import auth from '../../config/auth';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: auth.secret,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthenticateUserUseCase',
      useClass: AuthenticateUserUseCase,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
