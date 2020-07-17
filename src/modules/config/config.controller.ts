import { Controller, Get } from '@nestjs/common';
import { DBConfigService } from './dbConfig.service';

@Controller('config')
export class ConfigController {
  constructor(
    private readonly dbConfigService: DBConfigService,
  ){}

  /**
   * 获取业务配置（前端业务逻辑用）
   * @returns
   * @memberof ConfigController
   */
  @Get('businessConfig')
  async getBusinessConfig() {
    return await this.dbConfigService.geConfigs('BUSINESS')
  }
}
