import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheController } from './cache.controller';

/**
 * 缓存模块，node 可以使用多种缓存工具，都在当前模块注册，并提供 service
 * 可以根据需要注释掉不需要的缓存服务
 */
@Module({
  providers: [
    RedisService
  ],
  controllers: [CacheController],
  exports: [RedisService]
})
export class CacheModule {}
