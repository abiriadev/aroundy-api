import { createParamDecorator, SetMetadata } from '@nestjs/common';

export const UserId = createParamDecorator((_, { userId }) => userId);
