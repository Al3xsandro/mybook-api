import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ICreateOrderDTO {
  @ApiProperty()
  @IsUUID()
  user_id?: string;

  @ApiProperty()
  @IsUUID()
  book_id: string;

  @ApiProperty()
  @IsNotEmpty()
  datetime: string;
}
