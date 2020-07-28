import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { HelperModule } from '../helper/helper.module';
// import { CacheModule } from '@modules/cache/cache.module';
// import { MQModule } from '@modules/mq/mq.module';

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
    // CacheModule, 缓存
    // MQModule 消息队列
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}