import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { WeAppLoginDto } from './dto/weapp-login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { DecodePhoneDto } from './dto/decode-phone.dto';
import { ErrorException } from '@src/common/error.exception';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * 获取个人信息
   * @param req 
   */
  @UseGuards(AuthGuard())
  @Get('userinfo')
  @ApiOperation({summary: '个人信息', tags: ['用户鉴权']})
  @ApiBearerAuth()
  async getProfile(@Request() req) {
    const user = await this.userService.findUserByID(req.user.userId);
    if(user) {
      const {password, ...result} = user;
      return result;
    } else {
      throw new ErrorException('USER_NOT_FOUND', '用户不存在')
    }
  }

  /**
   * 账号密码/手机号 登录
   * @param loginDto 
   * @param res 
   */
  @Post('login')
  @ApiOperation({summary: '登陆', tags: ['用户鉴权']})
  async login(@Body() loginDto: LoginDto,  @Res() res) {
    let result;
    if(loginDto.password) {
      result = await this.authService.loginByPassword(loginDto);
    }
    res.setHeader('jwt-set', result.accessToken);
    res.send({ code: 0, msg: '成功', t: new Date().getTime()})
  }

  /**
   * 小程序登录
   * @param weAppLoginDto 
   * @param res 
   */
  @Post('weAppLogin')
  @ApiOperation({summary: '登陆', tags: ['用户鉴权']})
  async wxlogin(@Body() weAppLoginDto: WeAppLoginDto, @Res() res: Response) {
    const result = await this.authService.loginByWeApp(weAppLoginDto);
    res.setHeader('jwt-set', result.accessToken);
    res.status(200);
    res.send({ code: 0, data: result, msg: '成功', t: new Date().getTime()})
  }

  /**
   * 小程序绑定手机号
   * @param decodePhoneDto 
   * @param req 
   */
  @UseGuards(AuthGuard())
  @Post('bindWechatPhone')
  @ApiOperation({summary: '获取微信绑定的手机号', tags: ['用户鉴权']})
  async bindWechatPhone(@Body() decodePhoneDto: DecodePhoneDto, @Req() req): Promise<any> {
    const { code, encryptedData, iv } = decodePhoneDto;
    return await this.authService.bindWechatPhone(code, encryptedData, iv, req.user.userId)
  }
}
