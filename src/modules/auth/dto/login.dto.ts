import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @MinLength(11, {message: '手机号格式错误'})
  @MaxLength(11, {message: '手机号格式错误'})
  phone: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  @MinLength(6, {message: '验证码必须是6位'})
  @MaxLength(6, {message: '验证码必须是6位'})
  msgCode: string

  @ApiProperty({default: 'U2FsdGVkX18yHjKX2XTC1JfJUZTFjEiSzOwmRxwYgxgVxrdKkPdd2g=='})
  @IsString()
  msgStr: string;
}