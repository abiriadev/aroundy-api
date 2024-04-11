import { applyDecorators, CustomDecorator } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const Trim = (): PropertyDecorator => {
  return applyDecorators(
    Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    ),
  );
};

export const Public = (): CustomDecorator<string> =>
  SetMetadata('isPublic', true);

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
