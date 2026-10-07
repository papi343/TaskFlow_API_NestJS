import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { Notification } from '../../domain/entities/notification.entity';

@Injectable()
export class MarkAsReadUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(id: number): Promise<Notification> {
    return this.notificationRepository.markAsRead(id);
  }
}
