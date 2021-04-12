import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IFindTokenByUserAndRefreshTokenDTO } from '@modules/accounts/dtos/IFindTokenByUserAndRefreshTokenDTO';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, data);

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: IFindTokenByUserAndRefreshTokenDTO): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      userToken =>
        userToken.user_id === user_id && userToken.token === refresh_token,
    );

    return userToken;
  }

  async deleteById(token_id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex(
      userToken => userToken.id === token_id,
    );

    this.usersTokens.splice(userTokenIndex, 1);
  }

  async findByToken(token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      userToken => userToken.token === token,
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
