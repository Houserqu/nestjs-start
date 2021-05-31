import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { JwtPayload } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   * jwt 校验方法
   * 在这之前 jwt 生成的 token 已经通过校验，是安全有效的，所以这里可以直接返回 payload，并自动挂载在请求上下文中(req.user)
   * 也可以在这里做一些额外查询/校验逻辑
   * 安全问题：jwt 一旦签发之后，服务端无法主动销毁，存在被盗用的风险
   * @param payload 
   */
  async validate(payload: JwtPayload) {
    // 查询用户信息，判断用户是否合法

    // 如果使用权限守卫，可以在这里进行查询权限操作

    return payload
  }
}
