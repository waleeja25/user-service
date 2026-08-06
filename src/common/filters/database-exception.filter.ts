import { Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { MYSQL_ERRORS } from '../constants';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError) {
    const driverError = exception.driverError as {
      errno?: number;
      code?: string;
    };

    switch (driverError.errno) {
      case MYSQL_ERRORS.DUPLICATE_ENTRY:
        throw new ConflictException('Duplicate value already exists');

      case MYSQL_ERRORS.ROW_IS_REFERENCED:
        throw new ConflictException(
          'Record is still referenced by other records',
        );

      case MYSQL_ERRORS.NO_REFERENCED_ROW:
        throw new ConflictException('Referenced record does not exist');

      default:
        throw exception;
    }
  }
}
