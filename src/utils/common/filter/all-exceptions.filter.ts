import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: string | string[];
    let errorData: unknown = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        message = res?.message as string;
        errorData = res;
      } else {
        message = 'An error occurred';
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    console.log({
      errorData,
    });

    if (errorData && typeof errorData === 'object' && errorData !== null) {
      throw new HttpException(
        'You are not authorized to perform this action',
        HttpStatus.UNAUTHORIZED,
      );
    }

    response.status(status).json({
      success: false,
      error:
        errorData &&
        typeof errorData === 'object' &&
        errorData !== null &&
        'message' in errorData
          ? (errorData as { message: string }).message
          : typeof errorData === 'object' &&
              errorData !== null &&
              'error' in errorData
            ? (errorData as { error: string }).error
            : message,
    });
  }
}
