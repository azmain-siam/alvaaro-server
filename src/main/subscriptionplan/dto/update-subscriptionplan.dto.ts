import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionplanDto } from './create-subscriptionplan.dto';

export class UpdateSubscriptionplanDto extends PartialType(CreateSubscriptionplanDto) {}
