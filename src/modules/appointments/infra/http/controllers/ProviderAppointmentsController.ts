import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { day, year, month } = request.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id: id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

export default ProviderAppointmentsController;
