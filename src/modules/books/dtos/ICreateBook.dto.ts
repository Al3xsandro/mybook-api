import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ICreateBookDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  year: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
