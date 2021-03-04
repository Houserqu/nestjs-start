import { SetMetadata } from '@nestjs/common';

/**
 * 权限装饰器：给方法声明需要的 RBAC 权限
 * @param permissions 权限 code 列表
 */
export const Permission = (...permissions: string[]) => SetMetadata('permission', permissions);
