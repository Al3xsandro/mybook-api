import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ICreateUserDTO } from '../dtos/ICreateUser.dto';
import { CreateUserUseCase } from '../useCases/createAccount/CreateUserUseCase.service';

import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/infra/guards/jwt.guard';
import { FindUserUseCase } from '../useCases/findAccount/FindUserUseCase.service';
import { UserId } from '../../../shared/infra/http/decorators/userid.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('CreateUserUseCase')
    private createUserUseCase: CreateUserUseCase,
    @Inject('FindUserUseCase')
    private findUserUseCase: FindUserUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find user data' })
  @Get('/profile')
  async index(@UserId() id: string) {
    return await this.findUserUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: ICreateUserDTO })
  @Post('/')
  async create(@Body() data: ICreateUserDTO) {
    const user = await this.createUserUseCase.execute(data);

    return user;
  }
}
