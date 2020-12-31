import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Helper } from '../helper/helper.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly helper: Helper
  ) {}

  @Get('hello')
  async getHello(): Promise<any> {}
}
