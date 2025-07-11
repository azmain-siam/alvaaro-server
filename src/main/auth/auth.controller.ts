import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { uploadMultipleToCloudinary } from 'src/utils/cloudinary/cloudinary';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  async signup(
    @Body() createAuthDto: CreateUserDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const cloudinaryUrls =
      files?.length > 0
        ? (await uploadMultipleToCloudinary(files)).map(
            (res: { secure_url: string }) => res.secure_url,
          )
        : [];

    const profileImageUrl = cloudinaryUrls[0];

    return this.authService.create(createAuthDto, profileImageUrl);
  }

  @Post('/signin')
  async signin(@Body() signinDto: SignInDto) {
    return await this.authService.signin(signinDto);
  }
}
