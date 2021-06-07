import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { clsNamespace } from '@common/request.middleware';

// 获取当前请求的 traceID
const traceID = winston.format((info) => {
  info.traceID = clsNamespace.get('traceID');
  return info;
});

// 根据 label 生成 winston 配置
export function getWinstonConfig(label: string) {
  // 开发环境输出到文件
  const transport = process.env.NODE_ENV === 'production' ? new DailyRotateFile({
    dirname: 'logs',
    filename: 'nestjs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
  }) : new winston.transports.Console();

  return {
    defaultMeta: {
      label,
    },
    format: winston.format.combine(
      traceID(),
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
    transports: [transport],
  };
}

// 访问日志
export const accessLogger = winston.createLogger(getWinstonConfig('ACCESS'));
// 调用其他系统的请求日志
export const requestLogger = winston.createLogger(getWinstonConfig('REQUEST'));
// DB 日志
export const dbLogger = winston.createLogger(getWinstonConfig('DB'));
// 通用日志
export const logger = winston.createLogger(getWinstonConfig('DEFAULT'));
// 系统错误日志
export const errorLogger = winston.createLogger(getWinstonConfig('ERROR'));
