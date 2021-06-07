import { HttpService, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { ErrorException } from '@common/error.exception';
import { LoginDto } from './dto/login.dto';
import { WeAppLoginDto } from './dto/weapp-login.dto';
import { CreateWeAppUserDto } from '../user/dto/create-weapp-user.dto';
import { WXBizDataCrypt } from '@utils/crypto-util';
import { JwtPayload } from './auth.interface';
import { accessLogger } from '@common/logger';
import { Helper } from '@modules/helper/helper.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly helper: Helper
  ) {}

  /**
   * 手机号 和 密码 校验用户
   * @param {string} phone
   * @param {string} password
   * @returns {Promise<any>}
   * @memberof AuthService
   */
  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.userService.findOne(phone);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 手机号和密码登录（jwt）
   *
   * @param {LoginDto} loginDto
   * @returns {Promise<any>}
   * @memberof AuthService
   */
  async loginByPassword(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; userInfo: any }> {
    const user = await this.userService.findOne(loginDto.phone);
    if (user && user.password === loginDto.password) {
      const { password, id, ...rest } = user;
      return {
        accessToken: this.jwtService.sign({
          userId: user.id,
          phone: user.phone,
          nickname: user.nickname,
        }),
        userInfo: rest,
      };
    } else {
      throw new ErrorException('LOGIN_FAIL', '账号或密码错误');
    }
  }

  /**
   * 小程序登录（unionid 方式）
   * @param {WeAppLoginDto} weAppLoginDto
   * @returns {Promise<any>}
   * @memberof AuthService
   */
  async loginByWeApp(weAppLoginDto: WeAppLoginDto): Promise<any> {
    const url = 'https://api.weixin.qq.com/sns/jscode2session';
    const appid = this.configService.get('WEAPP_APPID');
    const secret = this.configService.get('WEAPP_SECRET');
    const grantType = this.configService.get('WEAPP_GRANT_TYPE');

    const requestUrl = `${url}?appid=${appid}&secret=${secret}&grant_type=${grantType}&js_code=${weAppLoginDto.code}`;
    const codeRes: any = await this.helper.get(requestUrl);

    accessLogger.info(requestUrl)

    // 从加密数据中获取 unionid
    const encryptedInfo = WXBizDataCrypt(
      appid,
      codeRes.data.session_key,
      weAppLoginDto.encryptedData,
      weAppLoginDto.iv,
    );

    if (encryptedInfo.unionId && encryptedInfo.openId) {
      // 判断用户是否存在
      const user = await this.userService.findOneByUnionid(
        encryptedInfo.unionId,
      );
      if (user) {
        const { password, id, ...rest } = user;
        const data: JwtPayload = {
          userId: user.id,
          phone: user.phone,
          nickname: user.nickname,
        };

        return {
          accessToken: this.jwtService.sign(data),
          userInfo: rest,
        };
      } else {
        const createWeAppUserDto: CreateWeAppUserDto = {
          avatarUrl: encryptedInfo.avatarUrl,
          city: encryptedInfo.city,
          country: encryptedInfo.country,
          gender: encryptedInfo.gender,
          province: encryptedInfo.province,
          unionid: encryptedInfo.unionId,
          openid: encryptedInfo.openId,
          nickname: encryptedInfo.nickName,
          appid,
        };
        const createUser = await this.userService.createByWechat(
          createWeAppUserDto,
        );
        const { password, id, ...rest } = createUser;

        return {
          accessToken: this.jwtService.sign({
            userId: createUser.id,
            phone: createUser.phone,
            nickname: createUser.nickname,
          }),
          userInfo: rest,
        };
      }
    } else {
      throw new ErrorException('CODE_FAIL', '获取用户微信信息失败');
    }
  }

  /**
   * 通过小程序获取手机号并绑定
   * @param {string} code
   * @param {string} encryptedData
   * @param {string} iv
   * @param {number} userId
   * @returns {Promise<any>}
   * @memberof AuthService
   */
  async bindWechatPhone(
    code: string,
    encryptedData: string,
    iv: string,
    userId: number,
  ): Promise<any> {
    const url = 'https://api.weixin.qq.com/sns/jscode2session';
    const appid = this.configService.get('WEAPP_APPID');
    const secret = this.configService.get('WEAPP_SECRET');
    const grantType = this.configService.get('WEAPP_GRANT_TYPE');

    const codeRes: any = await this.helper.get(`${url}?appid=${appid}&secret=${secret}&grant_type=${grantType}&js_code=${code}`)

    if (codeRes && codeRes.data.session_key) {
      const phoneInfo = WXBizDataCrypt(
        appid,
        codeRes.data.session_key,
        encryptedData,
        iv,
      );
      // 绑定手机号
      await this.userService.bindPhone(phoneInfo.phoneNumber, userId);
      return phoneInfo.phoneNumber;
    } else {
      throw new ErrorException('GET_DECODE_FAIL', '请求微信失败');
    }
  }

  /**
   * 根据 jwt token 获取 payload
   * @param {string} token
   * @returns {Promise<any>}
   */
  async getJwtPayload(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }
}
