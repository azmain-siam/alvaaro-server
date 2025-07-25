import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma-service/prisma-service.service';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordDto } from './dto/passwords.dto';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async signup(createUserDto: CreateUserDto, imageUrl: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        return ApiResponse.error(
          'Already registered with this email, please login',
        );
      }
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );

      const data = {
        ...createUserDto,
        password: hashedPassword,
        images: imageUrl,

      };

      const result = await this.prisma.user.create({ data });
      return ApiResponse.success(result, 'User Created Successfully');
    } catch (error) {
      return ApiResponse.error(error, 'User Created Failed!!');
    }
  }

  async signin(signinDto: SignInDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: signinDto.email },
      });

      if (!user) {
        return ApiResponse.error('User not found');
      }

      if (user.isDeleted) {
        return ApiResponse.error('This account has been deleted');
      }

      const isPasswordValid = await bcrypt.compare(
        signinDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        return ApiResponse.error('Invalid password');
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = await this.jwtService.signAsync(payload);

      return ApiResponse.success({ accessToken: token }, 'Login successful');
    } catch (error: unknown) {
      const message =
        error instanceof HttpException
          ? error.message
          : 'Internal server error';

      return {
        success: false,
        error: message,
      };
    }
  }
  
  async changePassword(id: string, dto: PasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return ApiResponse.error('User not found');
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      dto.oldpassword,
      user.password,
    );

    if (!isOldPasswordCorrect) {
      return ApiResponse.error('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newpassword, 10);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return ApiResponse.success(updatedUser, 'Password updated successfully');
  }
}
