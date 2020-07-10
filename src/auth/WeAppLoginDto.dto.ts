import { ApiProperty } from "@nestjs/swagger"
import { IsString } from 'class-validator';

export class WeAppLoginDto {
  @ApiProperty()
  @IsString()
  code: string

  @ApiProperty()
  @IsString()
  encryptedData: string;

  @ApiProperty()
  @IsString()
  iv: string;
}