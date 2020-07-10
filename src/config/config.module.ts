import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config.entity';
import { DBConfigService } from './dbConfig.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Config])
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
    },
    DBConfigService
  ],
  exports: [ConfigService, DBConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
