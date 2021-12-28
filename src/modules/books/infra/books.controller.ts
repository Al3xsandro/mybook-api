import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/infra/guards/jwt.guard';

import { ICreateBookDTO } from '../dtos/ICreateBook.dto';
import { IFindBooksDTO } from '../dtos/IFindBooks.dto';

import { CreateBookUseCase } from '../useCases/CreateBookUseCase/CreateBookUseCase.service';
import { FindAllBooksUseCase } from '../useCases/FindAllBooks/FindAllBooksUseCase.service';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(
    @Inject('CreateBookUseCase')
    private createBookUseCase: CreateBookUseCase,
    @Inject('FindAllBooksUseCase')
    private findAllBooksUseCase: FindAllBooksUseCase,
  ) {}

  @ApiOperation({
    summary: 'Find books to buy',
  })
  @ApiQuery({
    name: 'cep',
    required: false,
    schema: { type: 'string' },
    description: 'Get all books by cep',
  })
  @ApiQuery({
    name: 'city',
    required: false,
    schema: { type: 'string' },
    description: 'Get all books by city',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    schema: { type: 'string' },
    description: 'Get all books by name',
  })
  @Get('/')
  async findAllBooks(@Query() params: IFindBooksDTO) {
    if (params.city) {
      return await this.findAllBooksUseCase.execute({ city: params.city });
    }

    if (params.cep) {
      return await this.findAllBooksUseCase.execute({ cep: params.cep });
    }

    if (params.title) {
      return await this.findAllBooksUseCase.execute({ title: params.title });
    }

    const books = await this.findAllBooksUseCase.execute(params);

    return books;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: ICreateBookDTO })
  @Post('/')
  async create(@Body() data: ICreateBookDTO) {
    return this.createBookUseCase.execute(data);
  }
}
