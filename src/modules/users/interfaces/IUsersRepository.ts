import { ICreateUserDTO } from '../dtos/ICreateUser.dto';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findByCpf(cpf: string): Promise<User>;
  findById(user_id: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository };
