import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUser.dtos';

import { AuthenticateUserUseCase } from '../useCases/AuthenticateUser/AuthenticateUserUseCase.service';

@ApiTags('Authentication')
@Controller('users')
export class AuthController {
  constructor(
    @Inject('AuthenticateUserUseCase')
    private authenticationUserUserCase: AuthenticateUserUseCase,
  ) {}

  @ApiOperation({
    summary: 'Authenticate user',
  })
  @Post('/auth')
  public async auth(@Body() authenticateUserDTO: IAuthenticateUserDTO) {
    return this.authenticationUserUserCase.execute(authenticateUserDTO);
  }
}
