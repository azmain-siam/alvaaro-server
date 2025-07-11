import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma-service/prisma-service.service';
import { SignInDto } from './dto/signin.dto';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto, imageUrl: string) {
    console.log(createUserDto, imageUrl);
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );

      const data = {
        ...createUserDto,
        password: hashedPassword,
        image: imageUrl,
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
        throw new UnauthorizedException('User account not found');
      }

      if (user.isDeleted) {
        throw new UnauthorizedException('This account has been deleted');
      }

      const isPasswordValid = await bcrypt.compare(
        signinDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
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
}
