import { ISendForgotPasswordMailDTO } from '@shared/dtos/ISendForgotPasswordMailDTO';

interface IMailProvider {
  sendMail(data: ISendForgotPasswordMailDTO): Promise<void>;
}

export { IMailProvider };
