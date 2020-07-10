import { Body, Controller, Get, Post, Query, Req, Request, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/CreateUserDto.dto';
import { LoginDto } from './login.dto';
import { WeAppLoginDto } from './WeAppLoginDto.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { DecodePhoneDto } from './DecodePhoneDto.dto';
import { ErrorException } from '../common/error.exception';
import { err } from '../constant/error';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard())
  @Get('userinfo')
  @ApiOperation({summary: '个人信息', tags: ['用户鉴权']})
  async getProfile(@Request() req) {
    const user = await this.userService.findUserByID(req.user.userId);
    if(user) {
      const {password, ...result} = user;
      return result;
    } else {
      throw new ErrorException(err.USER_INFO_FAIL)
    }
  }

  @Post('login')
  @ApiOperation({summary: '登陆', tags: ['用户鉴权']})
  async login(@Body() loginDto: LoginDto,  @Res() res) {
    let result;
    if(loginDto.password) {
      result = await this.authService.loginByPassword(loginDto);
    }
    res.setHeader('jwt-set', result.accessToken);
    return result
  }

  @Post('weAppLogin')
  @ApiOperation({summary: '登陆', tags: ['用户鉴权']})
  async wxlogin(@Body() weAppLoginDto: WeAppLoginDto, @Res() res: Response) {
    const result = await this.authService.loginByWeApp(weAppLoginDto);
    res.setHeader('jwt-set', result.accessToken);
    res.status(200);
    res.send({ code: 0, data: result, msg: '成功', t: new Date().getTime()})
  }

  @UseGuards(AuthGuard())
  @Post('bindWechatPhone')
  @ApiOperation({summary: '获取微信绑定的手机号', tags: ['用户鉴权']})
  async bindWechatPhone(@Body() decodePhoneDto: DecodePhoneDto, @Req() req): Promise<any> {
    const { code, encryptedData, iv } = decodePhoneDto;
    return await this.authService.bindWechatPhone(code, encryptedData, iv, req.user.userId)
  }
}
