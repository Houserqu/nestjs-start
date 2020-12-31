import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 业务异常（字符串模式）
 */
export class ErrorException extends HttpException {
  constructor(code: string, message?: string, data?: any) {
    super({ code, message, data }, HttpStatus.OK);
  }
}
