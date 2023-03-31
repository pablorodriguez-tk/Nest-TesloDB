import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext): string[] => {
    const request = ctx.switchToHttp().getRequest();

    return request.rawHeaders;
  },
);
