import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

interface IProvidersResponse {
  id: string;

  name: string;

  email: string;

  created_at: Date;

  updated_at: Date;
}

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id: id,
    });

    const providersResponse: IProvidersResponse[] = providers.map(provider => {
      return {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        created_at: provider.created_at,
        updated_at: provider.updated_at,
      };
    });

    return response.json(providersResponse);
  }
}
