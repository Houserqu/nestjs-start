import { createParamDecorator } from '@nestjs/common';

export const Jwt = createParamDecorator((data, req) => {
  return req.user;
});