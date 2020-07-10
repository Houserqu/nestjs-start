import { Controller, Get, Headers, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req, @Headers() headers): string {
    return this.appService.getHello();
  }
}
