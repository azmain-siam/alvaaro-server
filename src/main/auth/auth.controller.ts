import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { uploadMultipleToCloudinary } from 'src/utils/common/cloudinary/cloudinary';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { PasswordDto } from './dto/passwords.dto';
import { Public } from 'src/guards/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
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

    return this.authService.signup(createAuthDto, profileImageUrl);
  }

  @Post('signin')
  async signin(@Body() signinDto: SignInDto) {
    return await this.authService.signin(signinDto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  async changePassword(@Body() dto: PasswordDto, @Req() req: Request) {
    return await this.authService.changePassword(req['userid'], dto);
  }
}
