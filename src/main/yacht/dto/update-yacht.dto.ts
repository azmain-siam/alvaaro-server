import { PartialType } from '@nestjs/swagger';
import { CreateYachtDto } from './create-yacht.dto';

export class UpdateYachtDto extends PartialType(CreateYachtDto) {}
