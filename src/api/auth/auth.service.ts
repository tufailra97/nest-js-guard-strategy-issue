import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenTypes } from 'src/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(): Promise<any> {
    const sessionToken = this.jwtService.sign(
      {
        user: { id: 'user.id' },
        type: TokenTypes.SESSION_TOKEN
      },
      {
        issuer: 'core.service',
        secret: 'session'
      }
    );

    return {
      sessionToken
    };
  }

  async selectAccount(): Promise<any> {
    const secureToken = this.jwtService.sign(
      {
        user: { id: 'user.id' },
        rest: {},
        type: TokenTypes.SECURE_TOKEN
      },
      {
        secret: 'secret'
      }
    );
    const sessionToken = this.jwtService.sign(
      {
        user: { id: 'user.id' },
        type: TokenTypes.SESSION_TOKEN
      },
      {
        secret: 'session'
      }
    );

    const refreshToken = this.jwtService.sign(
      {
        user: { id: 'user.id' },
        rest: {},
        type: TokenTypes.REFRESH_TOKEN
      },
      {
        secret: 'refresh'
      }
    );

    return {
      secureToken,
      sessionToken,
      refreshToken
    };
  }

  async refreshToken(): Promise<{ sessionToken: string; secureToken: string }> {
    const { secureToken, sessionToken } = await this.selectAccount();

    return {
      secureToken,
      sessionToken
    };
  }
}
