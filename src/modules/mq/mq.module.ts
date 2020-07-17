import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { MQController } from './mq.controller';

/**
 * 消息对列模块，默认是用的是 Rabbitmq
 * 
 * @export
 * @class MQModule
 */
@Module({
  providers: [RabbitService],
  controllers: [MQController]
})
export class MQModule {}
