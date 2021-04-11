import { IGenerateTokenDTO } from '@modules/accounts/dtos/IGenerateTokenDTO';
import { IVerifyTokenDTO } from '@modules/accounts/dtos/IVerifyTokenDTO';

export interface ITokenProvider {
  generateToken(data: IGenerateTokenDTO): string;
  verifyToken(data: IVerifyTokenDTO): string | object;
}
