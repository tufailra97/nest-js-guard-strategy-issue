import { SetMetadata } from '@nestjs/common';

export const USE_SECURE_TOKEN_KEY = 'useSecureToken';

export const UseSecureToken = (useSecureToken: boolean) =>
  SetMetadata(USE_SECURE_TOKEN_KEY, useSecureToken);
