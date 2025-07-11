
import { CategoryType } from '@prisma/client';

export class UpdateWatchDto {
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: CategoryType;
  sellerId?: string;

  condition?: string;
  manufacture?: string;
  warranty?: string;
  model?: string;
  waterResistance?: string;
  displayType?: string;
  strapMaterial?: string;
  movement?: string;
  size?: string;
  tractionType?: string;
  features?: string[] | string;
}

