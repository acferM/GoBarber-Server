import { ObjectID } from 'mongodb';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '../INotificationsRepository';

import Notification from '../../infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { content, recipient_id, id: new ObjectID() });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
