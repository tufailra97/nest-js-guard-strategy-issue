import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TOKEN_IDENTIFIERS } from 'src/constants';

@Injectable()
export class JwtSecureStrategy extends PassportStrategy(
  Strategy,
  TOKEN_IDENTIFIERS.SECURE_TOKEN
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtSecureStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secure'
    });
  }

  private static extractJWT(request: Request): string | null {
    return request?.cookies?.[TOKEN_IDENTIFIERS.SECURE_TOKEN];
  }

  async validate(payload) {
    return payload;
  }
}
