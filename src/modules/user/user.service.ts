import { Injectable } from '@nestjs/common';
import { User } from '@entity/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { ErrorException, err } from '@common/error.exception';
import { CreateWeAppUserDto } from './dto/CreateWeAppUserDto.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(phone: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        phone,
      },
    });
  }

  async findUserByID(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByUnionid(unionid: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
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
      throw new ErrorException(err.CREATE_PHONE_EXITED)
    }

    try {
      const user = new User();
      user.phone = createUserDto.phone;
      user.nickname = createUserDto.nickname;
      return this.userRepository.save(user)
    } catch (e) {
      throw new ErrorException(err.CREATE_USER_FAILD, e.message)
    }
  }

  async createByWechat(createWeAppUserDto: CreateWeAppUserDto): Promise<User | undefined> {
    const findUser = await this.userRepository.findOne({
      where: {
        unionid: createWeAppUserDto.unionid,
      },
    });

    if(findUser) {
      throw new ErrorException(err.CREATE_PHONE_EXITED)
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
      return this.userRepository.save(user)
    } catch (e) {
      throw new ErrorException(err.CREATE_USER_FAILD, e.message)
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
        throw new ErrorException(err.USER_PHONE_EXITED)
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
        throw new ErrorException(err.PHONE_EXITED)
      }
    }

    user.phone = phone;
    return this.userRepository.save(user)
  }
}
