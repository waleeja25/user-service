import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch()
export class GrpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: unknown): Observable<never> {
    if (exception instanceof RpcException) {
      return throwError(() => exception);
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      let message = exception.message;

      if (typeof response === 'object' && response !== null) {
        const errors = (response as { message?: string | string[] }).message;

        if (Array.isArray(errors)) {
          message = errors.join(', ');
        } else if (typeof errors === 'string') {
          message = errors;
        }
      }

      return throwError(
        () =>
          new RpcException({
            code: this.mapHttpStatusToGrpc(exception.getStatus()),
            message,
          }),
      );
    }

    return throwError(
      () =>
        new RpcException({
          code: status.INTERNAL,
          message: 'Internal server error',
        }),
    );
  }

  private mapHttpStatusToGrpc(httpStatus: HttpStatus): status {
    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
        return status.INVALID_ARGUMENT;

      case HttpStatus.UNAUTHORIZED:
        return status.UNAUTHENTICATED;

      case HttpStatus.FORBIDDEN:
        return status.PERMISSION_DENIED;

      case HttpStatus.NOT_FOUND:
        return status.NOT_FOUND;

      case HttpStatus.CONFLICT:
        return status.ALREADY_EXISTS;

      case HttpStatus.PRECONDITION_FAILED:
        return status.FAILED_PRECONDITION;

      default:
        return status.INTERNAL;
    }
  }
}
