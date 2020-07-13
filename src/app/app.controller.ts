import { Controller, Get, Headers, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Helper } from 'src/helper/helper.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly helper: Helper
  ) {}

  @Get()
  async getHello(@Req() req, @Headers() headers): Promise<any> {
    const res = await this.helper.axios({url: 'http://localhost:8090/users'})
    return res.data
  }
}
