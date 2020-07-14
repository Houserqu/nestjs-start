import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import doAccessLog from '../utils/doAccessLog';

export interface Response<T> {
  data: T;
}

/**
 * 响应体格式转换
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        const ctx = context.switchToHttp();
        const req: Request = ctx.getRequest();
        const res = ctx.getResponse();
        res.status(200);

        const resBody = {
          data,
          code: 0,
          msg: '成功',
          t: new Date().getTime(),
          path: req.url
        };

        doAccessLog(req, resBody); // 记录请求日志

        return resBody;
      }),
    );
  }
}

