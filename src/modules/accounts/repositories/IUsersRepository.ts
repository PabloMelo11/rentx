import { User } from '@modules/accounts/entities/User';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

export { IUsersRepository };
