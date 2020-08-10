import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { TypeOrmLogger } from '@modules/logger/typeOrmLogger.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService, typeOrmLogger) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: ['dist/entity/*.js'],
        synchronize: false,
        logging: process.env.NODE_ENV === 'development' ? 'all': false,
        logger: process.env.NODE_ENV === 'development' ? 'advanced-console' : typeOrmLogger
      }),
      inject: [ConfigService, TypeOrmLogger],
    }),
  ],
})
export class DatabaseModule {}
