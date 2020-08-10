import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ErrorException, err } from './common/error.exception';
import * as _ from 'lodash'
import { Logger } from '@modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });

  app.useLogger(app.get(Logger))

  // 跨域配置
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? ['https://baidu.com'] : '*'
  });

  if(process.env.NODE_ENV === 'development') {
    // swagger 文档
    const options = new DocumentBuilder()
      .setTitle('Swagger')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  // 全局参数校验 pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    // 自定义异常
    exceptionFactory: (errors) => new ErrorException(
      err.PARAMS_ERROR, _.flatten(errors.filter(item => !!item.constraints)
      .map(item => Object.values(item.constraints))
    ))}));

  await app.listen(8000);
}

bootstrap();
