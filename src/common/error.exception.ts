import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../constant/error';

export class ErrorException extends HttpException {
  constructor(errorCode: ErrorCode, data?: any) {
    errorCode.data = data;
    super(errorCode, errorCode.code);
  }
}