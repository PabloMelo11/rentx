import { ITokenType } from '@shared/dtos/ITokenTypeDTO';

interface ICreateUserTokenDTO {
  user_id: string;
  expires_date: Date;
  token: string;
  type: ITokenType;
}

export { ICreateUserTokenDTO };
