import { Injectable } from '@nestjs/common';
import { isProd } from '@utils/env';
import { Request } from 'express';
import * as log4js from 'log4js';
import * as path from 'path';

@Injectable()
export class Logger {
  public logger
  public loggerAccess
  public loggerError
  public loggerDebug
  public loggerRequest
  public loggerDB

  constructor(){
    const commonConfig = {
      type: 'file',
      pattern: 'yyyy-MM-dd',
      keepFileExt: true,
      daysToKeep: 15,
      alwaysIncludePattern: true
    };
    
    log4js.configure({
      appenders: {
        default: {
          filename: path.resolve('./logs/default.log'),
          ...commonConfig
        },
        access: {
          filename: path.resolve('./logs/access.log'),
          ...commonConfig
        },
        error: {
          filename: path.resolve('./logs/error.log'),
          ...commonConfig
        },
        debug: {
          filename: path.resolve('./logs/debug.log'),
          ...commonConfig
        },
        request: {
          filename: path.resolve('./logs/request.log'),
          ...commonConfig
        },
        db: {
          filename: path.resolve('./logs/db.log'),
          ...commonConfig
        },
      },
      categories: {
        default: {
          appenders: ['default'],
          level: 'INFO'
        },
        access: {
          appenders: ['access'],
          level: 'INFO'
        },
        error: {
          appenders: ['error'],
          level: 'WARN'
        },
        debug: {
          appenders: ['debug'],
          level: 'INFO'
        },
        request: {
          appenders: ['request'],
          level: 'INFO'
        },    
        db: {
          appenders: ['db'],
          level: 'INFO'
        },
      },
      pm2: isProd
    } as any);

    this.logger = log4js.getLogger('default');
    this.loggerAccess = log4js.getLogger('access');
    this.loggerError = log4js.getLogger('error');
    this.loggerDebug = log4js.getLogger('debug');
    this.loggerRequest = log4js.getLogger('request'); // 调用外部服务请求的日志
    this.loggerDB = log4js.getLogger('db'); // 调用外部服务请求的日志
  }

  log(message: string, trace) {
    if(isProd) {
      this.logger.info(message, trace);
    } else {
      console.log(message, trace)
    }
  }

  error(message: string, trace) {
    if(isProd) {
      this.loggerError.error(message, trace);
    } else {
      console.log(message, trace)
    }
  }

  warn(message: string) {
    if(isProd) {
      this.logger.warn(message);
    } else {
      console.log(message)
    }
  }

  debug(message: string) {
    if(isProd) {
      this.loggerDebug.debug(message);
    } else {
      console.log(message)
    }
  }

  verbose(message: string) {
    if(isProd) {
      this.logger.info(message);
    } else {
      console.log(message)
    }
  }

  doAccessLog(req: Request, resBody: any): void {
    const info = `method=${req.method}&ip=${req.ip}&ua=${req.headers['user-agent']}&url=${req.url}&jwt=${JSON.stringify(req.user)}&query=${JSON.stringify(req.query)}&reqBody=${JSON.stringify(req.body)}&resBody=${JSON.stringify(resBody)}`
    if(process.env.NODE_ENV === 'development'){
      console.log(info)
    } else{
      this.loggerAccess.info(info)
    } 
  }

  doRequestLog(url: string, data: any) {
    console.log(url, data)
  }
}