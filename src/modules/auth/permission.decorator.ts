import { SetMetadata } from '@nestjs/common';

/**
 * 权限装饰器：给方法声明需要的 RBAC 权限
 * @param permission 权限 code 列表
 */
export const Permission = (...permission: string[]) => SetMetadata('permission', permission);