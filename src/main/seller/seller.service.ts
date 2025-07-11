import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MailService } from 'src/utils/mail/mail.service';
import { OtpDto } from '../auth/dto/signin.dto';
import { ApiResponse } from 'src/utils/common/apiresponse/apiresponse';

@Injectable()
export class SellerService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private mail: MailService,
  ) {}

  async sendOtpAndCacheInfo(
    createSellerDto: CreateSellerDto,
    userEmail: string,
  ) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const cacheKey = `otp-${userEmail}`;
    const sellerInfoKey = `seller-info-${userEmail}`;

    // Save to cache
    const otps = await this.cacheManager.set(cacheKey, otp);
    console.log(otps);
    const datas = await this.cacheManager.set(sellerInfoKey, createSellerDto);
    await this.mail.sendMail(
      userEmail,
      `Your otp is ${otp}. This otp valid for 5 minutes`,
    );
    return { message: 'OTP sent successfully. Please check your email.' };
  }
  async verifyOtpAndCreate(otp: OtpDto, userId: string, userEmail: string) {
    const cacheOtp = await this.cacheManager.get(`otp-${userEmail}`);
    const userInfo = await this.cacheManager.get<CreateSellerDto>(
      `seller-info-${userEmail}`,
    );

    if (!cacheOtp || !userInfo) {
      return ApiResponse.error('Otp has been expired');
    }

    const subscriptionPlanDetails =
      await this.prisma.subscriptionPlan.findUnique({
        where: { id: userInfo.subscriptionPlan },
      });
    if (!subscriptionPlanDetails) {
      ApiResponse.error('Your Choosing subscription has been deleted');
    }

    const result = await this.prisma.seller.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        ...userInfo,
      },
    });
    if (!result) {
      ApiResponse.error('Failed to create seller Account');
    }

    if (!subscriptionPlanDetails?.length) {
      throw new Error('Invalid month length format.');
    }
    const now = new Date();
    const endTime = new Date(now);
    const monthLengthStr = parseInt(subscriptionPlanDetails?.length);
    const endTimes = endTime.setMonth(endTime.getMonth() + monthLengthStr);
    endTime.toISOString();

    const userSubscriptionPayload = {
      sellerId: result?.id,
      subscribedPlan: subscriptionPlanDetails?.id,
      expiryTime: endTimes,
    };
    // const userSubscriptionPlanCreated =
    //   await this.prisma.userSubscriptions.create({
    //     data: userSubscriptionPayload,
    //   });
    await this.cacheManager.del(`otp-${userEmail}`);
    await this.cacheManager.del(`seller-info-${userEmail}`);
    // return ApiResponse.success(result, 'Seller created successfully');
  }
  findAll() {
    return this.prisma.seller.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
// try {
//

//   return result;
// } catch (error) {
//   Logger.error('Upsert Seller Error:', error);
//   throw new InternalServerErrorException('Failed to create seller.');
// }
