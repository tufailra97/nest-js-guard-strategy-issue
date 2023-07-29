import { SetMetadata } from '@nestjs/common';

export const USE_REFRESH_TOKEN_KEY = 'useRefreshToken';

export const UseRefreshToken = (useRefreshToken: boolean) =>
  SetMetadata(USE_REFRESH_TOKEN_KEY, useRefreshToken);
