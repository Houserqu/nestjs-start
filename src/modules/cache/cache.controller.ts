import { Controller, Get } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('cache')
export class CacheController {
  constructor(
    private redisService: RedisService
  ){}

  /**
   * 获取数据库配置列表（使用了 redis 缓存）
   * 先判断存储的 key 是否存在，存在则直接读取，不存在则从 mysql 读取并缓存
   */
  @Get('example')
  async example(): Promise<any> {
    const isExists = await this.redisService.command('EXISTS', 'example')
    if(isExists) {
      const DBConfigs = await this.redisService.command('GET', 'example')
      return JSON.parse(DBConfigs)
    } else {
      const data = { example: 'example' }
      await this.redisService.command('SET', 'dbconfig', JSON.stringify(data))
      return data
    }
  }
}
