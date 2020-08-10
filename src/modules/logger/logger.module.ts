import { Module, Global } from '@nestjs/common';
import { Logger } from './logger.service';
import { TypeOrmLogger } from './typeOrmLogger.service';

@Global()
@Module({
  providers: [Logger, TypeOrmLogger],
  exports: [Logger, TypeOrmLogger],
})
export class LoggerModule {

}
