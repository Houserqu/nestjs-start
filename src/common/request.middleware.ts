import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { createNamespace } from 'cls-hooked';
import { accessLogger } from '@common/logger';
import * as _ from 'lodash';

export const clsNamespace = createNamespace('app')

export function RequestMiddleware(req: Request, res: Response, next: NextFunction) {
  /*
   * 绑定 async hooks，添加 traceID，用日志记录
   */
  clsNamespace.bind(req)
  clsNamespace.bind(res)

  const traceID = uuidv4()

  clsNamespace.run(() => {
    clsNamespace.set('traceID', traceID)

    next()
    accessLogger.info(
      req.url,
      _.assign(
        _.pick(req, ['ip', 'hostname', 'method', 'url', 'body', 'user', 'httpVersion', 'headers' ]),
        _.pick(res, ['statusCode'])
      )
    );
  })
}
