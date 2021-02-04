import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Helper } from '../helper/helper.service';
import { Logger } from '@modules/helper/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly helper: Helper,
    private readonly logger: Logger
  ) {}

  @Get('hello')
  async getHello(): Promise<any> {
    this.logger.error('12312312312323')
  }
}
