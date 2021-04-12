import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';

import { AppError } from '@shared/infra/http/errors/AppError';
import { ITokenType } from '@shared/dtos/ITokenTypeDTO';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { ITokenProvider } from '@shared/container/providers/TokenProvider/ITokenProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayloadVerifyToken {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
      secret_token,
      expires_in_token,
    } = auth;

    const { email, sub } = this.tokenProvider.verifyToken({
      token: refresh_token,
      secret: secret_refresh_token,
    }) as IPayloadVerifyToken;

    const user_id = sub;

    const user_token = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      { user_id, refresh_token },
    );

    if (!user_token) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(user_token.id);

    const new_refresh_token = this.tokenProvider.generateToken({
      secret: secret_refresh_token,
      payload: { email },
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      token: new_refresh_token,
      user_id,
      type: ITokenType.refresh_token,
    });

    const token = this.tokenProvider.generateToken({
      secret: secret_token,
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return {
      token,
      refresh_token: new_refresh_token,
    };
  }
}

export { RefreshTokenUseCase };
