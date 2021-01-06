import { Injectable } from '@nestjs/common';
import { User } from '@model/User';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorException } from '@common/error.exception';
import { CreateWeAppUserDto } from './dto/create-weapp-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async findOne(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        phone,
      },
    });
  }

  async findUserByID(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByUnionid(unionid: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        unionid,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const findUser = await this.userRepository.findOne({
      where: {
        phone: createUserDto.phone,
      },
    });

    if(findUser) {
      throw new ErrorException('PHONE_EXITED', '手机号已注册')
    }

    try {
      const user = new User();
      user.phone = createUserDto.phone;
      user.nickname = createUserDto.nickname;
      return user.save()
    } catch (e) {
      throw new ErrorException('CREATE_USER_FAIL', '创建用户失败')
    }
  }

  async createByWechat(createWeAppUserDto: CreateWeAppUserDto): Promise<User | undefined> {
    const findUser = await this.userRepository.findOne({
      where: {
        unionid: createWeAppUserDto.unionid,
      },
    });

    if(findUser) {
      throw new ErrorException('PHONE_EXITED', '手机号已注册')
    }

    try {
      const user = new User();
      user.nickname = createWeAppUserDto.nickname;
      user.openid = createWeAppUserDto.openid;
      user.unionid = createWeAppUserDto.unionid;
      user.avatarUrl = createWeAppUserDto.avatarUrl;
      user.country = createWeAppUserDto.country;
      user.province = createWeAppUserDto.province;
      user.city = createWeAppUserDto.city;
      user.appid = createWeAppUserDto.appid;
      return user.save()
    } catch (e) {
      throw new ErrorException('CREATE_USER_FAIL', '创建失败')
    }
  }

  async bindPhone(phone: string, userId: number): Promise<User | undefined> {
    let user;
    {
      user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      // 判断是否已经绑定手机号
      if(user.phone) {
        throw new ErrorException('SELF_BIND', '已绑定手机号')
      }
    }

    // 判断手机号是否被其他人绑定
    {
      const findPhoneUser = await this.userRepository.findOne({
        where: {
          phone,
        },
      });

      if (findPhoneUser) {
        throw new ErrorException('OTHER_BIND', '手机号已被其他用户绑定')
      }
    }

    user.phone = phone;
    return user.save()
  }
}
