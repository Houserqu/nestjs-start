import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbLogger } from '@common/logger';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.NEST_MYSQL_HOST,
      port: parseInt(process.env.NEST_MYSQL_PORT),
      username: process.env.NEST_MYSQL_USER,
      password: process.env.NEST_MYSQL_PASSWORD,
      database: process.env.NEST_MYSQL_DATABASE,
      autoLoadModels: true,
      synchronize: false,
      logging: msg => dbLogger.info(msg)
    }),
  ],
})
export class DatabaseModule {}
