import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Helper } from '../helper/helper.service';
import { ErrorException, err } from 'src/common/error.exception';
import { IsString, IsArray } from 'class-validator';
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

  @Post()
  async getHello(@Body() body: IndexBodyDto, @Jwt() jwt: JwtPayload): Promise<any> {
    console.log(body)
    throw new ErrorException(err.DECODE_PHONE_FAIL)
    const res = await this.helper.axios({url: 'http://localhost:8090/users'})
    return res.data
  }
}
