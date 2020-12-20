import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplate';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
