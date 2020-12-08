// import nodemailer, { Transporter } from 'nodemailer/lib/ses-transport';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplate';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  // private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    console.log('funcionou');
  }
}
