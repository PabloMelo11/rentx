import { IGenerateTokenDTO } from '../../dtos/IGenerateTokenDTO';

export interface ITokenProvider {
  generateToken(data: IGenerateTokenDTO): string;
}
