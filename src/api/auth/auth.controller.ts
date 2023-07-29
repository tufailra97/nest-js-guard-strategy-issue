import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { TOKEN_IDENTIFIERS } from 'src/constants';
import {
  GetRefreshToken,
  PublicRoute,
  UseRefreshToken,
  UseSecureToken
} from 'src/decorators';
import { RefreshToken } from 'src/types';

import { JwtRefreshAuthGuard } from '../../guards/jwt-refresh.guard';
import { AuthService } from './auth.service';

// TODO: handle token expiration in app config service

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res({ passthrough: true }) response: Response) {
    const { sessionToken, ...rest } = await this.authService.login();

    // expire the token in 10 minutes
    const now = Date.now();
    const expires = new Date(now + 10 * 60 * 1000);

    response.cookie(TOKEN_IDENTIFIERS.SESSION_TOKEN, sessionToken, {
      expires
    });

    response.cookie(TOKEN_IDENTIFIERS.SECURE_TOKEN, '', {
      maxAge: -1
    });

    return rest;
  }

  @ApiBearerAuth()
  @UseSecureToken(false)
  @Post('select-account')
  async selectAccount(@Res({ passthrough: true }) response: Response) {
    const now = Date.now();
    const { secureToken, sessionToken, refreshToken, ...rest } =
      await this.authService.selectAccount();

    // expires the session token in 30 minutes
    const expires = new Date(now + 30 * 60 * 1000);
    // expires the refresh token in 10 days
    const refreshExpires = new Date(now + 10 * 24 * 60 * 60 * 1000);

    response.cookie(TOKEN_IDENTIFIERS.SESSION_TOKEN, sessionToken, {
      expires
    });

    response.cookie(TOKEN_IDENTIFIERS.SECURE_TOKEN, secureToken, {
      expires,
      httpOnly: true,
      secure: true
    });

    response.cookie(TOKEN_IDENTIFIERS.REFRESH_TOKEN, refreshToken, {
      expires: refreshExpires,
      httpOnly: true,
      secure: true
    });

    return rest;
  }

  @Get('/refresh-token')
  @PublicRoute()
  @ApiOkResponse()
  @UseRefreshToken(true)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@GetRefreshToken() tokenContent: RefreshToken) {
    console.log(tokenContent); // trying to get the token content here
    return this.authService.refreshToken();
  }
}
