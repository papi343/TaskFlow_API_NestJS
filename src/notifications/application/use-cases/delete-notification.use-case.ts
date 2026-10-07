import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../domain/repositories/notification.repository';

@Injectable()
export class DeleteNotificationUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
