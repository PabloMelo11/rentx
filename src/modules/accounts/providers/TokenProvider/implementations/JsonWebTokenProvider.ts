import { sign } from 'jsonwebtoken';

import { ITokenProvider } from '../ITokenProvider';
import { IGenerateTokenDTO } from '../../../dtos/IGenerateTokenDTO';

class JsonWebTokenProvider implements ITokenProvider {
  public generateToken({
    payload = {},
    secret,
    subject,
  }: IGenerateTokenDTO): string {
    const token = sign(payload, secret, {
      subject,
      expiresIn: '1d',
    });

    return token;
  }
}

export { JsonWebTokenProvider };
