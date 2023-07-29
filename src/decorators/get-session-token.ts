import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { SessionToken } from 'src/types';

/**
 * Returns the jwt payload of the current request.
 * @returns {SessionToken}
 */
export const GetSessionToken = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user as SessionToken;

    return user;
  }
);
