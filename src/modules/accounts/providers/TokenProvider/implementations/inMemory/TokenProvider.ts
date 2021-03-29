import crypto from 'crypto';

import { ITokenProvider } from '../../ITokenProvider';
import { IGenerateTokenDTO } from '../../../../dtos/IGenerateTokenDTO';

class TokenProviderInMemory implements ITokenProvider {
  public generateToken({
    payload = {},
    secret,
    subject,
  }: IGenerateTokenDTO): string {
    const tokenHash = crypto.randomBytes(8).toString('hex');
    const token = `${tokenHash}-${secret}-${subject}`;

    return token;
  }
}

export { TokenProviderInMemory };
