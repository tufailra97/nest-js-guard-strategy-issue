import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { TOKEN_IDENTIFIERS } from 'src/constants';
import { IS_PUBLIC_KEY, USE_SECURE_TOKEN_KEY } from 'src/decorators';

@Injectable()
export class JwtSecureAuthGuard extends AuthGuard(
  TOKEN_IDENTIFIERS.SECURE_TOKEN
) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const useSecureToken: boolean = this.reflector.getAllAndOverride(
      USE_SECURE_TOKEN_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isPublic || useSecureToken === false) {
      return true;
    }

    return super.canActivate(context);
  }
}
