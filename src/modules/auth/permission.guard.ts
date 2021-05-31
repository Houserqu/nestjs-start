import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash'

/**
 * 声明接口权限装饰器，配合权限守卫使用（PermissionGuard），需要提前注册权限守卫
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>('permission', context.getHandler());
    if (!permissions || permissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 如果请求中没有 user，代表用户未登录校验，无法获取用户信息
    if(!user) {
      return false
    }
    
    /*
     * 查出当前用户的所有权限列表
     * 一般需要在身份校验阶段查出拥有的权限列表，并带到 user 对象上，然后在这里进行校验）
     */
    const userPermissions = user.permissions || []
    // 要求的权限必须都有
    return _.intersection(permissions, _.map(userPermissions, 'code')).length === permissions.length;
  }
}
