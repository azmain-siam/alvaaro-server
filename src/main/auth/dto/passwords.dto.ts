import { ApiProperty } from '@nestjs/swagger';

export class PasswordDto {
  @ApiProperty({ example: '123456' })
  oldpassword: string;

  @ApiProperty({ example: '234567' })
  newpassword: string;
}
