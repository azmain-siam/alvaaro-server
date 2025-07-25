import { CreateCarDto } from 'src/main/car/dto/create-car.dto';
import { CreateJewelleryDto } from 'src/main/jwellery/dto/create-jwellery.dto';
import { CreateRealEstateDto } from 'src/main/real-estate/dto/create-real-estate.dto';
import { CreateWatchDto } from 'src/main/watch/dto/create-watch.dto';
import { CreateYachtDto } from 'src/main/yacht/dto/create-yacht.dto';

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: string;
  trending?: number;
  RealEstate?: CreateRealEstateDto;
  Car?: CreateCarDto;
  Watch?: CreateWatchDto;
  Yacht?: CreateYachtDto;
  Jewellery?: CreateJewelleryDto;
}
