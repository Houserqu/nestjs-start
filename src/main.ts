import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@modules/helper/logger.service';
import { RequestMiddleware } from '@common/request.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 依赖注入日志服务
  app.useLogger(await app.resolve(Logger))

  // 请求处理中间件：处理 request-id
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
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(8000);
}

bootstrap();
