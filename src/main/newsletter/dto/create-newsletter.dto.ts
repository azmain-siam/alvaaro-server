import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateNewsletterDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email address of the user subscribing to the newsletter',
  })
  @IsEmail()
  email: string;
}
