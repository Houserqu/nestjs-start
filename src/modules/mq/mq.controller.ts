import { Controller, Get } from '@nestjs/common';
import { RabbitService } from './rabbit.service';

@Controller('mq')
export class MQController {
  constructor(
    private rabbitService: RabbitService
  ){}

  @Get('publishHello')
  async publishHello() {
    return await this.rabbitService.publishHello()
  }
  
  @Get('publishWorld')
  async publishWorld() {
    return await this.rabbitService.publishWorld()
  }
}
