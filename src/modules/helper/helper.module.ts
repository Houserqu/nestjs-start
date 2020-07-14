import { Module, Global, HttpModule } from '@nestjs/common';
import { Helper } from './helper.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [Helper],
  exports: [Helper]
})
export class HelperModule {}
