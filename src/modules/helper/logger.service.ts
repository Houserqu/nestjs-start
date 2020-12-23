import { Injectable, Logger as NestLogger } from '@nestjs/common';
import { isProd } from '@utils/env';
import { Request } from 'express';
import * as log4js from 'log4js';
import * as path from 'path';

@Injectable()
export class Logger extends NestLogger{
  public logger;
  public loggerAccess;
  public loggerError;
  public loggerDebug;
  public loggerRequest;
  public loggerDB;

  constructor() {
    super()

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
        DEBUG: { appenders: ['default'], level: 'INFO' },
        REQUEST: { appenders: ['default'], level: 'INFO' },
        DB: { appenders: ['default'], level: 'INFO' },
      },
      pm2: isProd,
    } as any);

    this.logger = log4js.getLogger('DEFAULT');
    this.loggerAccess = log4js.getLogger('ACCESS');
    this.loggerError = log4js.getLogger('ERROR');
    this.loggerDebug = log4js.getLogger('DEBUG');
    this.loggerRequest = log4js.getLogger('REQUEST'); // 调用外部服务请求的日志
    this.loggerDB = log4js.getLogger('DB'); // 调用外部服务请求的日志
  }

  log(message: string, trace) {
    if (isProd) {
      this.logger.info(message, trace);
    } else {
      super.log(message, trace);
    }
  }

  error(message: string, trace) {
    if (isProd) {
      this.loggerError.error(message, trace);
    } else {
      super.error(message, trace);
    }
  }

  warn(message: string) {
    if(isProd) {
      this.logger.warn(message);
    } else {
      super.warn(message)
    }
  }

  debug(message: string) {
    if (isProd) {
      this.loggerDebug.debug(message);
    } else {
      super.log(message);
    }
  }

  verbose(message: string) {
    if (isProd) {
      this.logger.info(message);
    } else {
      super.verbose(message);
    }
  }

  db(message: string) {
    if (isProd) {
      this.loggerDB.info(message);
    } else {
      super.log(message);
    }
  }

  doAccessLog(req: Request, resBody: any): void {
    const info = `method=${req.method}&ip=${req.ip}&ua=${req.headers['user-agent']}&url=${req.url}&jwt=${JSON.stringify(req.user)}&query=${JSON.stringify(req.query)}&reqBody=${JSON.stringify(req.body)}&resBody=${JSON.stringify(resBody)}`;
    if (isProd) {
      this.loggerAccess.info(info);
    } else {
      super.log(info);
    }
  }

  doRequestLog(url: string, data: any) {
    console.log(url, data);
  }
}
