import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionPlanDto } from './create-subscriptionplan.dto';

export class UpdateSubscriptionplanDto extends PartialType(
  CreateSubscriptionPlanDto,
) {}
