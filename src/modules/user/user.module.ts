import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {User} from './user.entity'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
