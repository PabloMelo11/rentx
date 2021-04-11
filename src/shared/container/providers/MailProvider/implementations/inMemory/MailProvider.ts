import { IMailProvider } from '../../IMailProvider';

import { ISendForgotPasswordMailDTO } from '@shared/dtos/ISendForgotPasswordMailDTO';

class MailProviderInMemory implements IMailProvider {
  private mails: ISendForgotPasswordMailDTO[] = [];

  async sendMail(mail: ISendForgotPasswordMailDTO): Promise<void> {
    this.mails.push(mail);
  }
}

export { MailProviderInMemory };
