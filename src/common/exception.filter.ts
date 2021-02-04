import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorException } from './error.exception';
import { logger, doAccessLog } from '@modules/helper/logger';
import { getRequestId } from '@modules/helper/helper.utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(){}

  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    let code, data, msg, status;

    // HttpException 错误
    if(exception instanceof HttpException) {
      const exceptionBody: any = exception.getResponse();
    
      // ErrorException 是自定义的业务异常，数据结构有拓展，跟 HttpException 不同
      if(exception instanceof ErrorException) {
        code = exceptionBody.code;
        data = exceptionBody.data || null;
        msg = exceptionBody.message;
        status = HttpStatus.OK
      } else {
        code = exception.getStatus();
        data = exceptionBody.message || null;
        msg = exceptionBody.error || exceptionBody.message;
        status = exception.getStatus();
      }
    } else {
      // 系统错误
      status = HttpStatus.INTERNAL_SERVER_ERROR
      code = 'SYSTEM_ERROR'
      msg = '系统错误'
      data = exception.message
      
      // 记录错误堆栈信息到日志中
      logger.error(getRequestId(request), exception.message, exception.stack)
    }

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');

    const resBody = { code, data, msg, t: new Date().getTime(), path: request.url };

    // 打印请求日志
    doAccessLog(request, resBody);

    response.send(resBody);
  }
}
