import { sign, verify } from 'jsonwebtoken';

import { ITokenProvider } from '@shared/container/providers/TokenProvider/ITokenProvider';

import { IGenerateTokenDTO } from '@modules/accounts/dtos/IGenerateTokenDTO';
import { IVerifyTokenDTO } from '@modules/accounts/dtos/IVerifyTokenDTO';

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

  public verifyToken({ token, secret }: IVerifyTokenDTO): string | object {
    return verify(token, secret);
  }
}

export { TokenProviderJsonWebToken };
