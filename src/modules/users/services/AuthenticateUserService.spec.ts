// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      email: 'matheus.acfer@nave.org.br',
      name: 'Matheus',
      password: '123',
    });

    const response = await authenticateUser.execute({
      email: 'matheus.acfer@nave.org.br',
      password: '123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'matheus.acfer@nave.org.brr',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      email: 'matheus.acfer@nave.org.br',
      name: 'Matheus',
      password: '123',
    });

    await expect(
      authenticateUser.execute({
        email: 'matheus.acfer@nave.org.br',
        password: '12333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
