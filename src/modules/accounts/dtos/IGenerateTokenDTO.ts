export interface IGenerateTokenDTO {
  payload?: string | object | Buffer;
  secret: string;
  subject: string;
}
