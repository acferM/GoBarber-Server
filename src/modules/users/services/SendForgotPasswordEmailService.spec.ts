import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Send Forgot Password Email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'pessoa',
      email: 'pessoa@email.com',
      password: '123',
    });

    await sendForgotPasswordEmail.execute({ email: 'pessoa@email.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non existing user password', async () => {
    expect(
      sendForgotPasswordEmail.execute({ email: 'pessoa@email.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'pessoa',
      email: 'pessoa@email.com',
      password: '123',
    });

    await sendForgotPasswordEmail.execute({ email: 'pessoa@email.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
