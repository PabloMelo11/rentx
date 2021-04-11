import { UserTokens } from '../infra/typeorm/entities/UserTokens';

import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { IFindTokenByUserAndRefreshTokenDTO } from '../dtos/IFindTokenByUserAndRefreshTokenDTO';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    data: IFindTokenByUserAndRefreshTokenDTO,
  ): Promise<UserTokens>;

  deleteById(token_id: string): Promise<void>;
}

export { IUsersTokensRepository };
