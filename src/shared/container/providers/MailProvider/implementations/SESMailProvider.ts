import { Transporter, createTransport } from 'nodemailer';
import { SES } from 'aws-sdk';
import { injectable, inject } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplate';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: 'sa-east-1',
      }),
    });
  }

  async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
