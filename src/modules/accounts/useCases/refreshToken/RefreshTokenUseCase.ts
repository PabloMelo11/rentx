import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import auth from '@config/auth';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { ITokenProvider } from '@shared/container/providers/TokenProvider/ITokenProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayloadVerifyToken {
  sub: string;
  email: string;
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

  async execute(refresh_token: string): Promise<string> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { email, sub } = this.tokenProvider.verifyToken({
      token: refresh_token,
      secret: secret_refresh_token,
    }) as IPayloadVerifyToken;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      { user_id, refresh_token },
    );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

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
      refresh_token: new_refresh_token,
      user_id,
    });

    return new_refresh_token;
  }
}

export { RefreshTokenUseCase };
