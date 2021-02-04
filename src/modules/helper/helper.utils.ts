import { Request } from 'express';

/**
 * 获取请求id
 */
export function getRequestId(request: Request) {
  return request ? request.headers['x-correlation-id'] : ''
}
