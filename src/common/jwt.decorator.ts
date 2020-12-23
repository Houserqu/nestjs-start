import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 获取请求中 jwt payload 解析后的数据
 */
export const Jwt = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});