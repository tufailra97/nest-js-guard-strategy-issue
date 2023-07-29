import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TOKEN_IDENTIFIERS } from 'src/constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  TOKEN_IDENTIFIERS.REFRESH_TOKEN
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: 'refresh'
    });
  }

  private static extractJWT(request: Request): string | null {
    console.log('JwtRefreshStrategy.extractJwt', request); // not called
    return request?.cookies?.[TOKEN_IDENTIFIERS.REFRESH_TOKEN];
  }

  async validate(payload) {
    console.log('payload refresh token', payload);
    return payload;
  }
}
