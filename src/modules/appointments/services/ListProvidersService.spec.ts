import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'teste@teste.com',
      password: '123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jhon Trê',
      email: 'teste@test.com',
      password: '123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'random person',
      email: 'teste@testando.com',
      password: '123',
    });

    const users = await listProviders.execute({ user_id: loggedUser.id });

    expect(users).toEqual([user1, user2]);
  });
});
