import { UserTokens } from '../infra/typeorm/entities/UserTokens';

import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
