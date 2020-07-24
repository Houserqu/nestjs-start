import { HttpException } from '@nestjs/common';

interface ErrorCode {
  code: number
  msg: string
  data?: string
}

/**
 * 业务异常
 */
export class ErrorException extends HttpException {
  constructor(errorCode: ErrorCode, data?: any) {
    errorCode.data = data;
    super(errorCode, errorCode.code);
  }
}

export const err = {
  // 通用错误
  INTERNAL_SERVER_ERROR: { code: 500, msg: '系统内部错误' },
  PARAMS_ERROR: { code: 400, msg: '参数错误' },

  // 用户相关
  CREATE_PHONE_EXITED: { code: 1200, msg: '该手机号已注册' },
  CREATE_USER_FAILD: { code: 1201, msg: '注册失败' },
  LOGIN_FAIL: { code: 1202, msg: '未注册或密码错误' },
  CODE_FAIL: { code: 1203, msg: '微信 code 获取用户信息失败' },
  UNIONID_EXITED: { code: 1204, msg: '微信用户已注册' },
  DECODE_PHONE_REQUEST_FAIL: { code: 1205, msg: '请求微信服务器失败' },
  DECODE_PHONE_FAIL: { code: 1205, msg: '解析手机号失败' },
  PHONE_EXITED: { code: 1206, msg: '手机号已被其他用户绑定' },
  USER_PHONE_EXITED: { code: 1207, msg: '已绑定手机号' },
  USER_INFO_FAIL: { code: 1208, msg: '获取用户信息失败，请先登录' },

  // 数据库相关
  DB_REDIS_COMMAND_ERROR: { code: 8101, msg: 'Redis 执行命令失败' },
  DB_REDIS_GET_ERROR: { code: 8102, msg: 'Redis 读取 key 失败' }
};