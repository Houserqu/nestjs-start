import { loggerAccess } from '../common/Log4j.logger';
import { Request } from 'express';

/**
 * 记录请求日志
 * @param req
 * @param resBody
 */
export default function doAccessLog(req: Request, resBody: any): void {
  loggerAccess.info(`method=${req.method}&ip=${req.ip}&ua=${req.headers['user-agent']}&url=${req.url}&jwt=${JSON.stringify(req.user)}query=${JSON.stringify(req.query)}&reqBody=${JSON.stringify(req.body)}&resBody=${JSON.stringify(resBody)}`);
}