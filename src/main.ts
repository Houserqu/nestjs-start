import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestMiddleware } from '@common/request.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { getWinstonConfig } from '@common/logger';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(getWinstonConfig('DEFAULT'))
  });

  // 请求处理中间件：处理 traceID
  app.use(RequestMiddleware);

  // 跨域配置
  app.enableCors({
    origin: ''
  });

  // 静态文件配置，路径前缀为 static
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static/'
  });


  if(process.env.NODE_ENV !== 'production') {
    // swagger 文档
    const options = new DocumentBuilder()
      .setTitle('NestJs')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(8000);
}

bootstrap();
