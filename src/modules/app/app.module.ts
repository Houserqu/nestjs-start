import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { HelperModule } from '../helper/helper.module';
import { PermissionGuard } from '@modules/auth/permission.guard';
import { AllExceptionsFilter } from '@common/exception.filter';
import { TransformInterceptor } from '@src/common/transform.interceptor';
import { ErrorException } from '@src/common/error.exception';
import * as _ from 'lodash'

/**
 * 根模块，所有需要使用的模块都需要在根模块引入
 * 被注释的模块默认没有开启，提供了基本示例，可以根据需要开启和修改相关模块代码
 * @export
 * @class AppModule
 */
@Module({
  imports: [
    HelperModule,
    UserModule,
    AuthModule,
    ConfigModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      // 异常过滤器，格式化错误输出
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },    
    {
      // 全局拦截器
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      // 全局参数校验 pipe
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({
        transform: true, 
        // 自定义异常
        exceptionFactory: (errors) => new ErrorException(
          'INVALID_PARAMS', '参数错误', _.flatten(errors.filter(item => !!item.constraints)
          .map(item => Object.values(item.constraints))
        ))})
    },
    {
      // 全局注册权限守卫, 配合 Permission 装饰器使用
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    Logger,
    AppService,
  ],
})
export class AppModule {}
