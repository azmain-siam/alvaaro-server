import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateRealEstateDto {
  @ApiProperty() @IsString() beds: string;
  @ApiProperty() @IsString() washroom: string;
  @ApiProperty() @IsString() size: string;
  @ApiProperty({ type: [String] }) @IsArray() text: string[];
  @ApiProperty() @IsString() state: string;
  @ApiProperty() @IsString() city: string;
  @ApiProperty() @IsString() zip: string;
  @ApiProperty() @IsString() address: string;
  @ApiProperty({ type: [String] }) @IsArray() feature: string[];
}
