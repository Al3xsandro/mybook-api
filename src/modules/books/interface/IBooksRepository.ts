import { ICreateBookDTO } from '../dtos/ICreateBook.dto';
import { Book } from '../infra/typeorm/entities/Book';

export interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  findAll(): Promise<Book[]>;
  findByCity(city: string): Promise<Book[]>;
  findByCep(cep: string): Promise<Book[]>;
  findByTitle(title: string): Promise<Book[]>;
  findById(id: string): Promise<Book>;
}
