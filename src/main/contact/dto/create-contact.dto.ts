import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'Saiful Islam',
    description: 'Full name of the person contacting',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Bangladesh',
    description: 'Country from which the person is contacting',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: '+8801234567**',
    description: 'Phone number of the person',
  })
  @IsString()
  number: string;

  @ApiProperty({
    example: 'I am interested in your services.',
    description: 'Message or inquiry from the person',
  })
  @IsString()
  message: string;
}
