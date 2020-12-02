import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
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
