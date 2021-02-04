import * as log4js from 'log4js';
import * as path from "path";
import { Request } from 'express';
import { getRequestId } from '@modules/helper/helper.utils';

log4js.configure({
  appenders: {
    default: {
      filename: path.resolve('./logs/default.log'),
      type: 'file',
      pattern: 'yyyy-MM-dd',
      keepFileExt: true,
      daysToKeep: 15,
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: { appenders: ['default'], level: 'INFO' },
    ACCESS: { appenders: ['default'], level: 'INFO' },
    ERROR: { appenders: ['default'], level: 'WARN' },
    DEBUG: { appenders: ['default'], level: 'DEBUG' },
    REQUEST: { appenders: ['default'], level: 'INFO' },
    DB: { appenders: ['default'], level: 'INFO' },
  },
  pm2: true,
} as any);

export const logger = log4js.getLogger('DEFAULT')
export const loggerAccess = log4js.getLogger('ACCESS');
export const loggerError = log4js.getLogger('ERROR');
export const loggerDebug = log4js.getLogger('DEBUG');
export const loggerRequest = log4js.getLogger('REQUEST'); // 调用外部服务请求的日志
export const loggerDB = log4js.getLogger('DB'); // 调用外部服务请求的日志

export const doAccessLog = function(req: Request, resBody: any): void {
  const info = `${getRequestId(req)} ${req.method} ${req.ip} ${req.headers['user-agent']} ${req.url} user=${JSON.stringify(req.user || null)} reqBody=${JSON.stringify(req.body)} resBody=${JSON.stringify(resBody)}`;
  loggerAccess.info(info);
}
