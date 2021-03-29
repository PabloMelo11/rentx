import { IGenerateTokenDTO } from '@modules/accounts/dtos/IGenerateTokenDTO';

export interface ITokenProvider {
  generateToken(data: IGenerateTokenDTO): string;
}
