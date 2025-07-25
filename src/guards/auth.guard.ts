import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string | undefined> }>();
    const authHeader = request.headers['authorization'];

    if (typeof authHeader !== 'string') return false;

    const token = authHeader.split(' ')[1];

    if (!token) return false;

    try {
      const payload = await this.jwtService.verifyAsync<UserInfoJwt>(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!payload) return false;
      // Attach user info to request
      request['userid'] = payload.id;
      request['email'] = payload.email;
      request['role'] = payload.role;
    } catch (err) {
      console.error('JWT verification failed:', err);
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
