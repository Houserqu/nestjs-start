import { Injectable } from '@nestjs/common';
import { Config } from './config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class DBConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>
  ) {}

  /**
   * 获取数据中的配置
   */
  async getBusinessConfig(): Promise<Config[]> {
    const configs = await this.configRepository.find({
      where: { type: 'BUSINESS' }
    })

    return _.keyBy(configs, 'code')
  }
}
