import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/infra/guards/jwt.guard';
import { UserId } from '../../../shared/infra/http/decorators/userid.decorator';

import { IFindOrdersDTO } from '../dtos/FindOrders.dto';
import { ICreateOrderDTO } from '../dtos/ICreateOrder.dto';

import { ApproveOrderUseCase } from '../useCases/ApproveOrder/ApproveOrderUseCase.service';
import { CreateOrderUseCase } from '../useCases/CreateOrder/CreateOrderUseCase.service';
import { FindOrdersUseCase } from '../useCases/FindAllOrders/FindOrdersUseCase.service';
import { FindOrdersToApproveUseCase } from '../useCases/FindOrdersToAprove/FindOrdersToApproveUseCase.service';

@ApiTags('Orders')
@Controller('/orders')
class OrdersController {
  constructor(
    @Inject('CreateOrderUseCase')
    private createOrderUseCase: CreateOrderUseCase,
    @Inject('ApproveOrderUseCase')
    private approveOrderUseCase: ApproveOrderUseCase,
    @Inject('FindOrdersToApproveUseCase')
    private findOrdersToApproveUseCase: FindOrdersToApproveUseCase,
    @Inject('FindOrdersUseCase')
    private findOrdersUseCase: FindOrdersUseCase,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Approve Order',
  })
  @UseGuards(JwtAuthGuard)
  @Put('/')
  async approveOrder(
    @UserId() id: string,
    @Body() { order_id }: IFindOrdersDTO,
  ) {
    const order = await this.approveOrderUseCase.execute(id, order_id);

    return order;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all orders to approve' })
  @UseGuards(JwtAuthGuard)
  @Get('/pending')
  async findOrdersToApprove(@UserId() id: string) {
    const orders = await this.findOrdersToApproveUseCase.execute(id);

    return orders;
  }

  @ApiOperation({ summary: 'Get all orders' })
  @Get('/')
  async findAllOrders() {
    const orders = await this.findOrdersUseCase.execute();

    return orders;
  }

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
