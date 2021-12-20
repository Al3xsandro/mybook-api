import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/infra/guards/jwt.guard';
import { UserId } from 'src/shared/infra/http/decorators/userid.decorator';
import { ICreateOrderDTO } from '../dtos/ICreateOrder.dto';
import { CreateOrderUseCase } from '../useCases/CreateOrder/CreateOrderUseCase.service';

@ApiTags('Orders')
@Controller('/orders')
class OrdersController {
  constructor(
    @Inject('CreateOrderUseCase')
    private createOrderUseCase: CreateOrderUseCase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new order' })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(
    @UserId() id: string,
    @Body() { book_id, datetime }: ICreateOrderDTO,
  ) {
    const order = await this.createOrderUseCase.execute({
      user_id: id,
      book_id,
      datetime,
    });

    return order;
  }
}

export { OrdersController };
