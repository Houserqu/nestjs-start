import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { HelperModule } from '../helper/helper.module';
import { CacheModule } from '@modules/cache/cache.module';

@Module({
  imports: [
    HelperModule,
    UserModule,
    AuthModule,
    ConfigModule,
    DatabaseModule,
    CacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
