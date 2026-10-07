import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectMembersController } from './projects/project-members/presentation/http/project-members.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from './notifications/notification.modul.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    NotificationModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController, ProjectMembersController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
