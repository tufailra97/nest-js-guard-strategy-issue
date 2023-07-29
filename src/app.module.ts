import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './api/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtSecureAuthGuard } from './guards/jwt-secure.guard';
import { JwtSessionAuthGuard } from './guards/jwt-session.guard';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtSecureStrategy } from './strategies/jwt-secure.strategy';
import { JwtSessionStrategy } from './strategies/jwt-session.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
    JwtRefreshStrategy,
    JwtSecureStrategy,
    JwtSessionStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtSessionAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: JwtSecureAuthGuard
    }
  ]
})
export class AppModule {}
