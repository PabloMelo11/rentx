import { classToClass } from 'class-transformer';

import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IResponseUserDTO } from '../dtos/IResponseUserDTO';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IResponseUserDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
