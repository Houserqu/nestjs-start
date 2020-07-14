import { Controller, Get, Headers, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Helper } from '../helper/helper.service';
import { ErrorException, err } from 'src/common/error.exception';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly helper: Helper
  ) {}

  @Get()
  async getHello(@Req() req, @Headers() headers): Promise<any> {
    throw new ErrorException(err.DECODE_PHONE_FAIL)
    const res = await this.helper.axios({url: 'http://localhost:8090/users'})
    return res.data
  }
}
