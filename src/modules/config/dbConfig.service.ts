import { Injectable } from '@nestjs/common';
import { Config as DBConfig } from '@entity/Config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class DBConfigService {
  constructor(
    @InjectRepository(DBConfig)
    private readonly configRepository: Repository<DBConfig>
  ) {}

  /**
   * 获取数据中的配置
   */
  async geConfigs(type?: string): Promise<DBConfig[]> {
    const where: any = {}
    if(type) {
      where.type = type
    }

    const configs = await this.configRepository.find({
      where
    })

    // 转换成 obj 对象，便于前端查找
    return _.keyBy(configs, 'code')
  }
}
