import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
