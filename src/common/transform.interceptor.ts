import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { accessLogger } from '@common/logger';
import * as _ from 'lodash';
import { clsNamespace } from '@common/request.middleware';

export interface Response<T> {
  data: T;
}

/**
 * 响应体格式转换
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor() {}

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
          traceID: clsNamespace.get('traceID')
        };

        accessLogger.info(req.url, _.pick(req, ['ip', 'method', 'url', 'body', 'user']));

        return resBody;
      }),
    );
  }
}

