import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { SecureToken } from 'src/types';

/**
 * Returns the jwt payload of the current request.
 * @returns {SecureToken}
 */
export const GetSecureToken = createParamDecorator(
  (_: string, ctx: ExecutionContext): SecureToken => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user as SecureToken;

    return user;
  }
);
