import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  @Get('/')
  async getHello(@Res() res: Response): Promise<any> {
    res.sendFile(path.resolve(__dirname, '..', '..', '..', 'static/index.html'))
  }
}
