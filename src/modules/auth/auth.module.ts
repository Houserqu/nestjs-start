import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // AuthGuard 的默认鉴权策略
    JwtModule.register({
      secret: process.env.NEST_JWT_SECRET,
      signOptions: { expiresIn: process.env.NEST_JWT_EXPIRE }
    }),
    PassportModule,
    UserModule,
    HttpModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
