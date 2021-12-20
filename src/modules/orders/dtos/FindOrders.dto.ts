import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IFindOrdersDTO {
  @ApiProperty()
  @IsUUID()
  order_id: string;
}
