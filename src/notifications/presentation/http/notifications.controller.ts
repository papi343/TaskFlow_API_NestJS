import { Controller, Get, Patch, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { GetMyNotificationsUseCase } from '../../application/use-cases/get-my-notifications.use-case';
import { MarkAsReadUseCase } from '../../application/use-cases/mark-as-read.use-case';
import { DeleteNotificationUseCase } from '../../application/use-cases/delete-notification.use-case';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly getMyNotificationsUseCase: GetMyNotificationsUseCase,
    private readonly markAsReadUseCase: MarkAsReadUseCase,
    private readonly deleteNotificationUseCase: DeleteNotificationUseCase,
  ) {}

  @Get()
  async getMyNotifications(@Req() req: any) {
    return this.getMyNotificationsUseCase.execute(req.user.id);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.markAsReadUseCase.execute(Number(id));
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    return this.deleteNotificationUseCase.execute(Number(id));
  }
}
