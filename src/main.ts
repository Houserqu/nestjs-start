import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/allException.filter';
import { TransformInterceptor } from './common/transform.interceptor';
import { Log4j } from './common/Log4j.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Log4j()
  });

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
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  // 异常过滤器，格式化输出
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(8000);
}

bootstrap();
