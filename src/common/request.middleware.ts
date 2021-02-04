import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export function RequestMiddleware(req: Request, res: Response, next: NextFunction) {
  // 如果 header 已经有 x-correlation-id，则直接使用
  req.headers['x-correlation-id'] = req.headers['x-correlation-id'] || uuidv4()
  res.setHeader('X-Correlation-Id', req.headers['x-correlation-id'])
  next();
}
