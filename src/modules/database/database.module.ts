import { Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbLogger } from '@common/logger';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService) => ({
        dialect: 'mysql',
        host:  configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        autoLoadModels: true,
        synchronize: false,
        logging: msg => dbLogger.info(msg)
      }),
      inject: [ConfigService]
    }),
  ],
})
export class DatabaseModule {}
