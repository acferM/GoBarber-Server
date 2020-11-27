import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'matheus.acfer@nave.org.br',
      name: 'Matheus',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Outro nome kk',
      email: 'emailDeTeste@email.com',
    });

    expect(updatedUser.name).toBe('Outro nome kk');
    expect(updatedUser.email).toBe('emailDeTeste@email.com');
  });

  it('should not be able to update user email to another user email', async () => {
    await fakeUsersRepository.create({
      email: 'matheus.acfer@nave.org.br',
      name: 'Matheus',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      email: 'matheus2.acfer@nave.org.br',
      name: 'Matheus',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Outro nome kk',
        email: 'matheus.acfer@nave.org.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'matheus2.acfer@nave.org.br',
      name: 'Matheus',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Outro nome kk',
      email: 'emailDeTeste@email.com',
      old_password: '123',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'matheus2.acfer@nave.org.br',
      name: 'Matheus',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Outro nome kk',
        email: 'emailDeTeste@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'matheus2.acfer@nave.org.br',
      name: 'Matheus',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Outro nome kk',
        email: 'emailDeTeste@email.com',
        old_password: 'wrong old password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile of a non-existing-user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Outro nome kk',
        email: 'emailDeTeste@email.com',
        old_password: 'wrong old password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
