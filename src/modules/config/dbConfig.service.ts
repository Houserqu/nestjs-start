import { Injectable } from '@nestjs/common';
import { Config as DBConfig } from '@model/Config';
import { InjectModel } from '@nestjs/sequelize';
import * as _ from 'lodash'

@Injectable()
export class DBConfigService {
  constructor(
    @InjectModel(DBConfig)
    private configModel: typeof DBConfig
  ) {}

  /**
   * 获取数据中的配置
   */
  async getConfigObj(type?: string): Promise<{[key: string]: DBConfig}> {
    const where: any = {}
    if(type) {
      where.type = type
    }

    const configs = await this.configModel.findAll({
      where
    })

    // 转换成 obj 对象，便于前端查找
    return _.keyBy(configs, 'code')
  }
}
