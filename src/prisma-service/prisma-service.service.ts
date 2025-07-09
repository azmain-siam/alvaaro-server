import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.log(error);
    }
  }
  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      console.log(error);
    }
  }
}
