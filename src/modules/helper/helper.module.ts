import { Module, Global, HttpModule } from '@nestjs/common';
import { Helper } from './helper.service';
import { Logger } from '@modules/helper/logger.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [Helper, Logger],
  exports: [Helper, Logger]
})
export class HelperModule {}
