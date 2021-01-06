import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { Config as DBConfig } from '@model/Config';
import { DBConfigService } from './dbconfig.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([DBConfig]),
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        '.env',
      ),
    },
    DBConfigService
  ],
  exports: [ConfigService, DBConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
