
import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { NotificationRepository } from './domain/repositories/notification.repository';
import { PrismaNotificationRepository } from './infrastructure/repositories/prisma-notification.repository';
import { TaskCreatedNotificationListener } from './listeners/task-created.listener';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaNotificationRepository,

    {
      provide: NotificationRepository,
      useExisting: PrismaNotificationRepository,
    },
    TaskCreatedNotificationListener,

  ],
  exports: [NotificationRepository],
})
export class NotificationModule {}

