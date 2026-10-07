import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationRepository } from './domain/repositories/notification.repository';
import { PrismaNotificationRepository } from './infrastructure/repositories/prisma-notification.repository';
import { TaskCreatedNotificationListener } from './listeners/task-created.listener';
import { NotificationsController } from './presentation/http/notifications.controller';
import { GetMyNotificationsUseCase } from './application/use-cases/get-my-notifications.use-case';
import { MarkAsReadUseCase } from './application/use-cases/mark-as-read.use-case';
import { DeleteNotificationUseCase } from './application/use-cases/delete-notification.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [
    PrismaNotificationRepository,
    {
      provide: NotificationRepository,
      useExisting: PrismaNotificationRepository,
    },
    TaskCreatedNotificationListener,
    GetMyNotificationsUseCase,
    MarkAsReadUseCase,
    DeleteNotificationUseCase,
  ],
  exports: [NotificationRepository],
})
export class NotificationModule {}
