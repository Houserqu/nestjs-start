import { Logger } from '@nestjs/common';
import * as log4js from 'log4js';
import * as path from 'path';
import { isProd } from '../utils/env';

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

export const logger = log4js.getLogger('default');
export const loggerAccess = log4js.getLogger('access');
export const loggerError = log4js.getLogger('error');
export const loggerDebug = log4js.getLogger('debug');
export const loggerRequest = log4js.getLogger('request'); // 调用外部服务请求的日志
export const loggerDB = log4js.getLogger('db'); // 调用外部服务请求的日志

export class Log4j extends Logger {
  constructor() {
    super();
  }

  log(message: string, trace) {
    if(isProd) {
      logger.info(message, trace);
    } else {
      super.log(message, trace)
    }
  }

  error(message: string, trace) {
    if(isProd) {
      loggerError.error(message, trace);
    } else {
      super.log(message, trace)
    }
  }

  warn(message: string) {
    if(isProd) {
      logger.warn(message);
    } else {
      super.log(message)
    }
  }

  debug(message: string) {
    if(isProd) {
      loggerDebug.debug(message);
    } else {
      super.log(message)
    }
  }

  verbose(message: string) {
    if(isProd) {
      logger.info(message);
    } else {
      super.log(message)
    }
  }
}