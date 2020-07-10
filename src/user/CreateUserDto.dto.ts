import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty({default: '123456'})
  @IsString()
  msgCode: string;

  @ApiProperty({default: 'U2FsdGVkX18yHjKX2XTC1JfJUZTFjEiSzOwmRxwYgxgVxrdKkPdd2g=='})
  @IsString()
  msgStr: string;
}