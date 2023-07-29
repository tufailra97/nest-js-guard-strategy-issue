import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TOKEN_IDENTIFIERS } from 'src/constants';

@Injectable()
export class JwtSessionStrategy extends PassportStrategy(
  Strategy,
  TOKEN_IDENTIFIERS.SESSION_TOKEN
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'session'
    });
  }

  async validate(payload) {
    return payload;
  }
}
