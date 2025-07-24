import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    try {
      const payload = await this.jwtService.verifyAsync<UserInfoJwt>(token, {
        secret: process.env.JWT_SECRET,
      });
      request['userid'] = payload.id;
      request['email'] = payload.email;
      request['role'] = payload.role;
    } catch {
      return false;
    }
    return true;
  }
}
export class UserInfoJwt {
  id: string;
  email: string;
  role: string;
}
