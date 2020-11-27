import IMailTemplateProvider from '../models/IMailTemplate';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
