
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { TaskCreatedEvent } from '../../projects/tasks/domain/events/task-created.event';
import { Notification } from '../../notifications/domain/entities/notification.entity';
import { NotificationRepository } from '../../notifications/domain/repositories/notification.repository';

@Injectable()
export class TaskCreatedNotificationListener {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @OnEvent('task-created')
  async handleTaskCreated(event: TaskCreatedEvent) {
    const notification = new Notification(
      null,
      `La tâche "${event.task.titre}" a été créée.`,
      false,
      event.ownerId,
    );

    await this.notificationRepository.create(notification);
  }
}

