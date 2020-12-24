import { Controller, Get } from '@nestjs/common';
import { DBConfigService } from './dbConfig.service';
import { ApiOperation } from '@nestjs/swagger';

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
  @ApiOperation({summary: '业务配置', tags: ['配置']})
  @Get('businessConfig')
  async getBusinessConfig() {
    return await this.dbConfigService.getConfigObj('BUSINESS')
  }
}
