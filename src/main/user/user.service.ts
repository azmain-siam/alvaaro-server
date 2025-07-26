/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.user.findMany();
    // console.log('Users:', users);
    return users;
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return ApiResponse.success(user, 'User found successfully');
    } catch (error) {
      console.error('Error finding user:', error);
      return ApiResponse.error(error.response.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('Update User DTO:', updateUserDto);
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });
      if (!user) {
        return ApiResponse.error(`User with ID ${id} not found`);
      }

      await this.prisma.user.update({
        where: { id },
        data: { isDeleted: true },
      });

      return ApiResponse.success(null, 'User removed successfully');
    } catch (error) {
      console.error('Error removing user:', error);
      return ApiResponse.error(error);
    }
  }
}
