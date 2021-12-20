import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IAuthenticateUserDTO {
  @ApiProperty()
  cpf: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
