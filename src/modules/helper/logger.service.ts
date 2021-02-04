import { Inject, Injectable, Logger as NestLogger, Scope } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@modules/config/config.service';
import { logger, loggerAccess, loggerError, loggerRequest, loggerDebug, loggerDB } from '@modules/helper/logger';
import { REQUEST } from '@nestjs/core';
import { getRequestId } from '@modules/helper/helper.utils';

@Injectable({ scope: Scope.REQUEST })
export class Logger extends NestLogger{
  public logger;
  public loggerAccess;
  public loggerError;
  public loggerDebug;
  public loggerRequest;
  public loggerDB;

  // 默认在控制台输出
  public logOutput = 'console';

  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly configService: ConfigService
  ) {
    super()

    this.logOutput = this.configService.get('LOG_OUTPUT')

    if(this.logOutput === 'file') {
      this.logger = logger;
      this.loggerAccess = loggerAccess;
      this.loggerError = loggerError;
      this.loggerDebug = loggerDebug;
      this.loggerRequest = loggerRequest; // 调用外部服务请求的日志
      this.loggerDB = loggerDB; // 调用外部服务请求的日志
    }
  }

  log(message: string, trace) {
    if (this.logOutput === 'file') {
      this.logger.info(getRequestId(this.request), message, trace);
    } else {
      super.log(message, trace);
    }
  }

  error(message: string, trace = '') {
    if (this.logOutput === 'file') {
      this.loggerError.error(getRequestId(this.request), message, trace);
    } else {
      super.error(message, trace);
    }
  }

  warn(message: string) {
    if (this.logOutput === 'file') {
      this.logger.warn(getRequestId(this.request), message);
    } else {
      super.warn(message)
    }
  }

  debug(message: string) {
    if (this.logOutput === 'file') {
      // @ts-ignore
      this.loggerDebug.debug(getRequestId(this.request), message);
    } else {
      super.log(message);
    }
  }

  verbose(message: string) {
    if (this.logOutput === 'file') {
      this.logger.info(getRequestId(this.request), message);
    } else {
      super.verbose(getRequestId(this.request), message);
    }
  }

  db(message: string) {
    if (this.logOutput === 'file') {
      this.loggerDB.info(getRequestId(this.request), message);
    } else {
      super.log(message);
    }
  }

  doRequestLog(url: string, data: any) {
    if (this.logOutput === 'file') {
      this.loggerRequest.info(getRequestId(this.request), url, data);
    } else {
      super.log(url, data);
    }
  }
}
