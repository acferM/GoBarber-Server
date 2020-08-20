import { getRepository } from 'typeorm';
// import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    // const passwordMatched =
  }
}

export default AuthenticateUserService;
