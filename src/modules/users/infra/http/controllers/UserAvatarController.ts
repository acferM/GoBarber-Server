import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

interface IUserResponse {
  id: string;

  name: string;

  email: string;

  created_at: Date;

  updated_at: Date;
}

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: request.file.filename,
    });

    const userResponse: IUserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userResponse);
  }
}
