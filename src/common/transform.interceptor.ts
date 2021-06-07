import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        const res = ctx.getResponse();
        res.status(200);

        return {
          data,
          code: 0,
          msg: '成功',
          t: new Date().getTime(),
          traceID: clsNamespace.get('traceID')
        };
      }),
    );
  }
}

