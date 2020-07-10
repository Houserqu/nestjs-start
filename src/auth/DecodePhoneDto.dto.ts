import { ApiProperty } from "@nestjs/swagger"
import { IsString } from 'class-validator';

export class DecodePhoneDto {
  @ApiProperty()
  @IsString()
  code: string;

  @IsString()
  iv: string;

  @IsString()
  encryptedData: string;
}