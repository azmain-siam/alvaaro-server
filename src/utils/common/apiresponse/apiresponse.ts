/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export class ApiResponse {
  static success<T>(data: T, message = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message = 'Something went wrong', error: any = null) {
    return {
      success: false,
      message,
      error,
    };
  }
}
