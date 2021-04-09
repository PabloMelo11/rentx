import { sign } from 'jsonwebtoken';

import { ITokenProvider } from '@modules/accounts/providers/TokenProvider/ITokenProvider';
import { IGenerateTokenDTO } from '@modules/accounts/dtos/IGenerateTokenDTO';

class TokenProviderJsonWebToken implements ITokenProvider {
  public generateToken({
    payload = {},
    secret,
    subject,
    expiresIn,
  }: IGenerateTokenDTO): string {
    const token = sign(payload, secret, {
      subject,
      expiresIn,
    });

    return token;
  }
}

export { TokenProviderJsonWebToken };
