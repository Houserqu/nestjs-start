import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Helper } from '../helper/helper.service';
import { IsString } from 'class-validator';
import { Jwt } from '@src/common/jwt.decorator';
import { JwtPayload } from '@modules/auth/auth.interface';


class IndexBodyDto {
  @IsString()
  code: string;

  @IsString()
  name: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly helper: Helper
  ) {}

  @Get('hello')
  async getHello(): Promise<any> {
    return await  this.appService.getUser()
    const res = await this.helper.axios({url: 'http://localhost:8090/users'})
  }
}
