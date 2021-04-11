import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../../IMailProvider';

import { ISendForgotPasswordMailDTO } from '@shared/dtos/ISendForgotPasswordMailDTO';

class MailProviderEthereal implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.error('Error in transporter', err));
  }

  async sendMail({
    to,
    body,
    subject,
  }: ISendForgotPasswordMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      text: body,
      html: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { MailProviderEthereal };
