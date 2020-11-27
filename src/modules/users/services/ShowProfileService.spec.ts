import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@email.com',
      password: '123',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('test');
    expect(profile.email).toBe('test@email.com');
  });

  it('should not be able to show non-existing-user profile', async () => {
    await expect(
      showProfile.execute({ user_id: 'not a real id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
