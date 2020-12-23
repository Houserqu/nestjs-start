import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@modules/user/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getUser() {
    return await this.userModel.findAll()
  }
}
