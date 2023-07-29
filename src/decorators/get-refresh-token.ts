import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { RefreshToken } from 'src/types';

/**
 * Returns the jwt payload of the current request.
 * @returns {SessionToken}
 */
export const GetRefreshToken = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user as RefreshToken;

    return user;
  }
);
