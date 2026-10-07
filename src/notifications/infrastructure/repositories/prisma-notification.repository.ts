import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationRepository } from '../../domain/repositories/notification.repository';

@Injectable()
export class PrismaNotificationRepository extends NotificationRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(notification: Notification): Promise<Notification> {
    const createdNotification = await this.prisma.notification.create({
      data: {
        message: notification.message,
        read: notification.read,
        userId: notification.userId,
      },
    });

    return new Notification(
      createdNotification.id,
      createdNotification.message,
      createdNotification.read,
      createdNotification.userId,
      createdNotification.createdAt,
    );
  }

  async findById(id: number): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return null;
    }

    return new Notification(
      notification.id,
      notification.message,
      notification.read,
      notification.userId,
      notification.createdAt,
    );
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
    });

    return notifications.map(
      (notification) =>
        new Notification(
          notification.id,
          notification.message,
          notification.read,
          notification.userId,
          notification.createdAt,
        ),
    );
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.prisma.notification.update({
      where: { id },
      data: {
        read: true,
      },
    });

    return new Notification(
      notification.id,
      notification.message,
      notification.read,
      notification.userId,
      notification.createdAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.notification.delete({
      where: { id },
    });
  }
}