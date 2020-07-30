import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthPermission } from '@src/entity/AuthPermission';
import { AuthRole } from '@src/entity/AuthRole';
import { AuthUserRole } from '@src/entity/AuthUserRole';
import { AuthRolePermission } from '@src/entity/AuthRolePermission';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // AuthGuard 的默认鉴权策略
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE') }
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([AuthPermission, AuthRole, AuthUserRole, AuthRolePermission]),
    PassportModule,
    UserModule,
    HttpModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
