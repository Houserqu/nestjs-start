import { Injectable } from '@nestjs/common';
import * as redis from "redis";
import { ConfigService } from '@modules/config/config.service';
import { promisify } from 'util'
import { ErrorException, err } from '@src/common/error.exception';

@Injectable()
export class RedisService {
  // 实例化后的 redis client 对象
  private readonly client: redis.RedisClient
  private readonly sendCommand: Function

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.client = redis.createClient({
      host: this.configService.get('REDIS_HOST'),
      port: parseInt(this.configService.get('REDIS_PORT')),
      password: this.configService.get('REDIS_PASSWORD'),
    });

    // redis 只支持回调方式，这里封装成 promise
    this.sendCommand = promisify(this.client.sendCommand).bind(this.client);
  }

  /**
   * 执行 redis 命令（该方法可以执行任何命令，可以在该方法基础上给特定命令封装方法）
   * @param commond 
   * @param arg 
   */
  async command(commond: string, ...arg) {
    try {
      return await this.sendCommand(commond, arg)
    } catch (error) {
      throw new ErrorException(err.DB_REDIS_COMMAND_ERROR, error.message)
    }
  }

  /**
   * 获取 字符串类型 值（基于 command 封装）
   * @param {string} key
   */
  async get(key: string) {
    return this.command('GET', key)
  }
}
